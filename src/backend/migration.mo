import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Int "mo:core/Int";

module {
  type OldUserProfile = {
    name : Text;
    age : Nat;
    address : Text;
    gender : { #male; #female; #other };
    phone : Text;
    email : Text;
    framePreferences : ?[{ #round; #square; #rectangular; #catEye; #aviator; #wayfarer; #oval }];
    profilePicture : ?Blob;
    prescriptionPicture : ?Blob;
  };

  type NewUserProfile = OldUserProfile;

  type OldLog = {
    mobileNumber : Text;
    verifiedAt : Int;
  };

  type PriceInfo = {
    baseFee : Nat;
    addOns : Nat;
    total : Nat;
  };

  type Booking = {
    id : Int;
    bookingType : { #mobileOptician; #repair; #rental };
    customer : Principal;
    provider : ?Principal;
    status : { #pending; #accepted; #scheduled; #inProgress; #completed; #cancelled };
    serviceType : ?{ #eyeTest; #frameTryOn; #combined };
    repairTypes : ?[{ #adjustment; #screwTightening; #lensReplacement; #other }];
    details : ?Text;
    address : ?Text;
    preferredTime : ?Text;
    price : PriceInfo;
    createdAt : Int;
    updatedAt : Int;
    mobileNumber : ?Text;
  };

  type Provider = {
    id : Principal;
    name : Text;
    phone : Text;
    email : Text;
    serviceAreas : Text;
    services : [{ #eyeTest; #frameTryOn; #combined }];
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

  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
    bookings : Map.Map<Int, Booking>;
    providers : Map.Map<Principal, Provider>;
    rentalCatalog : Map.Map<Int, RentalItem>;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
    verificationLogs : List.List<OldLog>;
    bookings : Map.Map<Int, Booking>;
    providers : Map.Map<Principal, Provider>;
    rentalCatalog : Map.Map<Int, RentalItem>;
  };

  public func run(old : OldActor) : NewActor {
    let newVerificationLogs = List.empty<OldLog>();
    {
      userProfiles = old.userProfiles;
      verificationLogs = newVerificationLogs;
      bookings = old.bookings;
      providers = old.providers;
      rentalCatalog = old.rentalCatalog;
    };
  };
};
