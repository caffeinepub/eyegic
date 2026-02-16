import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Int "mo:core/Int";

module {
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

  type PriceInfo = {
    baseFee : Nat;
    addOns : Nat;
    total : Nat;
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

  type RentalItem = {
    id : Int;
    name : Text;
    category : Text;
    pricePerDay : Nat;
    deposit : Nat;
    available : Bool;
  };

  type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  // New persistent state for the logo
  type LogoType = {
    image : Blob;
    mimeType : Text;
  };

  type OldActor = {
    bookings : Map.Map<Int, Booking>;
    providers : Map.Map<Principal, Provider>;
    rentalCatalog : Map.Map<Int, RentalItem>;
    userProfiles : Map.Map<Principal, UserProfile>;
    persistentLogo : ?LogoType;
  };

  type NewActor = {
    bookings : Map.Map<Int, Booking>;
    providers : Map.Map<Principal, Provider>;
    rentalCatalog : Map.Map<Int, RentalItem>;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    { old with userProfiles = old.userProfiles };
  };
};
