import Array "mo:core/Array";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  type BookingType = {
    #mobileOptician;
    #repair;
    #rental;
  };

  type BookingStatus = {
    #pending;
    #accepted;
    #scheduled;
    #inProgress;
    #completed;
    #cancelled;
  };

  module BookingStatus {
    public func compare(a : BookingStatus, b : BookingStatus) : Order.Order {
      if (a == b) {
        #equal;
      } else {
        #less;
      };
    };
  };

  type ServiceType = {
    #eyeTest;
    #frameTryOn;
    #combined;
  };

  type RepairType = {
    #adjustment;
    #screwTightening;
    #lensReplacement;
    #other;
  };

  module RepairType {
    public func compare(a : RepairType, b : RepairType) : Order.Order {
      if (a == b) {
        #equal;
      } else {
        #less;
      };
    };
  };

  type Booking = {
    id : Int;
    bookingType : BookingType;
    customer : Principal;
    provider : ?Principal;
    status : BookingStatus;
    serviceType : ?ServiceType;
    repairType : ?RepairType;
    details : Text;
    address : Text;
    preferredTime : Text;
    price : PriceInfo;
    createdAt : Int;
    updatedAt : Int;
  };

  module Booking {
    public func compare(a : Booking, b : Booking) : Order.Order {
      Int.compare(a.id, b.id);
    };
  };

  type PriceInfo = {
    baseFee : Nat;
    addOns : Nat;
    total : Nat;
  };

  module PriceInfo {
    public func compare(a : PriceInfo, b : PriceInfo) : Order.Order {
      Int.compare(a.baseFee, b.baseFee);
    };
  };

  type Provider = {
    id : Principal;
    name : Text;
    contact : Text;
    serviceAreas : Text;
    services : [ServiceType];
    availability : Text;
    active : Bool;
  };

  module Provider {
    public func compare(a : Provider, b : Provider) : Order.Order {
      Principal.compare(a.id, b.id);
    };
  };

  type RentalItem = {
    id : Int;
    name : Text;
    category : Text;
    pricePerDay : Nat;
    deposit : Nat;
    available : Bool;
  };

  module RentalItem {
    public func compare(a : RentalItem, b : RentalItem) : Order.Order {
      Int.compare(a.id, b.id);
    };
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  // State Management
  let bookings = Map.empty<Int, Booking>();
  let providers = Map.empty<Principal, Provider>();
  let rentalCatalog = Map.empty<Int, RentalItem>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management (Required by Instructions)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  let initialRentalItems = List.fromArray<RentalItem>(
    [
      {
        id = 1;
        name = "Classic Wayfarer";
        category = "Sunglasses";
        pricePerDay = 10;
        deposit = 50;
        available = true;
      },
      {
        id = 2;
        name = "Business Optics";
        category = "Correction";
        pricePerDay = 8;
        deposit = 40;
        available = true;
      },
      {
        id = 3;
        name = "Sport Vision";
        category = "Sports";
        pricePerDay = 15;
        deposit = 70;
        available = false;
      },
    ]
  );

  public shared ({ caller }) func initialize() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can initialize");
    };

    let iter = initialRentalItems.values();
    for (item in iter) {
      rentalCatalog.add(item.id, item);
    };
  };

  public shared ({ caller }) func createOpticianBooking(serviceType : ServiceType, details : Text, address : Text, preferredTime : Text, price : PriceInfo) : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: User authentication required");
    };

    let bookingId = bookings.size() + 1;
    let booking : Booking = {
      id = bookingId;
      bookingType = #mobileOptician;
      customer = caller;
      provider = null;
      status = #pending;
      serviceType = ?serviceType;
      repairType = null;
      details;
      address;
      preferredTime;
      price;
      createdAt = 0;
      updatedAt = 0;
    };

    bookings.add(bookingId, booking);
    bookingId;
  };

  public shared ({ caller }) func createRepairBooking(repairType : RepairType, details : Text, address : Text, preferredTime : Text, price : PriceInfo) : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: User authentication required");
    };

    let bookingId = bookings.size() + 1;
    let booking : Booking = {
      id = bookingId;
      bookingType = #repair;
      customer = caller;
      provider = null;
      status = #pending;
      serviceType = null;
      repairType = ?repairType;
      details;
      address;
      preferredTime;
      price;
      createdAt = 0;
      updatedAt = 0;
    };

    bookings.add(bookingId, booking);
    bookingId;
  };

  public shared ({ caller }) func createRentalBooking(itemId : Int, rentalPeriod : Int, address : Text, price : PriceInfo) : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: User authentication required");
    };

    let rentalItem = switch (rentalCatalog.get(itemId)) {
      case (null) {
        Runtime.trap("Rental item not found");
      };
      case (?item) { item };
    };

    let bookingId = bookings.size() + 1;
    let booking : Booking = {
      id = bookingId;
      bookingType = #rental;
      customer = caller;
      provider = null;
      status = #pending;
      serviceType = null;
      repairType = null;
      details = "Rental: " # rentalItem.name # ", Period: " # rentalPeriod.toText() # " days";
      address;
      preferredTime = "";
      price;
      createdAt = 0;
      updatedAt = 0;
    };

    bookings.add(bookingId, booking);
    bookingId;
  };

  public shared ({ caller }) func onboardProvider(name : Text, contact : Text, serviceAreas : Text, services : [ServiceType], availability : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: User authentication required");
    };

    let provider : Provider = {
      id = caller;
      name;
      contact;
      serviceAreas;
      services;
      availability;
      active = true;
    };

    providers.add(caller, provider);
  };

  public shared ({ caller }) func assignProviderToBooking(bookingId : Int, providerId : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can assign providers");
    };

    let existingBooking = switch (bookings.get(bookingId)) {
      case (null) {
        Runtime.trap("Booking not found");
      };
      case (?booking) { booking };
    };

    switch (providers.get(providerId)) {
      case (null) {
        Runtime.trap("Provider not found");
      };
      case (_) {
        let updatedBooking = {
          existingBooking with
          provider = ?providerId;
          status = #accepted;
          updatedAt = 0;
        };
        bookings.add(bookingId, updatedBooking);
      };
    };
  };

  public shared ({ caller }) func updateBookingStatus(bookingId : Int, newStatus : BookingStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: User authentication required");
    };

    let existingBooking = switch (bookings.get(bookingId)) {
      case (null) {
        Runtime.trap("Booking not found");
      };
      case (?booking) { booking };
    };

    let isAssignedProvider = switch (existingBooking.provider) {
      case (?providerId) { providerId == caller };
      case (null) { false };
    };

    if (not isAssignedProvider and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only assigned provider or admin can update booking status");
    };

    let updatedBooking = {
      existingBooking with
      status = newStatus;
      updatedAt = 0;
    };
    bookings.add(bookingId, updatedBooking);
  };

  public query ({ caller }) func getBooking(bookingId : Int) : async Booking {
    let booking = switch (bookings.get(bookingId)) {
      case (null) {
        Runtime.trap("Booking not found");
      };
      case (?b) { b };
    };

    let isCustomer = booking.customer == caller;
    let isProvider = switch (booking.provider) {
      case (?providerId) { providerId == caller };
      case (null) { false };
    };
    let isAdminUser = AccessControl.isAdmin(accessControlState, caller);

    if (not isCustomer and not isProvider and not isAdminUser) {
      Runtime.trap("Unauthorized: Can only view your own bookings");
    };

    booking;
  };

  public query ({ caller }) func getCustomerBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: User authentication required");
    };

    let customerBookings = List.empty<Booking>();
    let values = bookings.values();
    for (booking in values) {
      if (booking.customer == caller) {
        customerBookings.add(booking);
      };
    };
    customerBookings.toArray();
  };

  public query ({ caller }) func getProviderBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: User authentication required");
    };

    switch (providers.get(caller)) {
      case (null) {
        Runtime.trap("Unauthorized: Only registered providers can view provider bookings");
      };
      case (_) {};
    };

    let providerBookings = List.empty<Booking>();
    let values = bookings.values();
    for (booking in values) {
      switch (booking.provider) {
        case (?providerId) {
          if (providerId == caller) {
            providerBookings.add(booking);
          };
        };
        case (null) {};
      };
    };
    providerBookings.toArray();
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    let bookingsArray = List.empty<Booking>();
    let values = bookings.values();
    for (booking in values) {
      bookingsArray.add(booking);
    };
    bookingsArray.toArray();
  };

  public query ({ caller }) func getRentalCatalog() : async [RentalItem] {
    let rentalItemsArray = List.empty<RentalItem>();
    let values = rentalCatalog.values();
    for (item in values) {
      rentalItemsArray.add(item);
    };
    rentalItemsArray.toArray();
  };

  public query ({ caller }) func findAvailableRentalItems() : async [RentalItem] {
    let availableItems = List.empty<RentalItem>();
    let values = rentalCatalog.values();
    for (item in values) {
      if (item.available) {
        availableItems.add(item);
      };
    };
    availableItems.toArray();
  };

  public query ({ caller }) func getProvider(providerId : Principal) : async ?Provider {
    providers.get(providerId);
  };

  public query ({ caller }) func getActiveProviders() : async [Provider] {
    let activeProviders = List.empty<Provider>();
    let values = providers.values();
    for (provider in values) {
      if (provider.active) {
        activeProviders.add(provider);
      };
    };
    activeProviders.toArray();
  };
};
