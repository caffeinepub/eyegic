import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";

module {
  // Define old state type
  type OldBookingType = {
    #mobileOptician;
    #repair;
    #rental;
  };

  type OldBookingStatus = {
    #pending;
    #accepted;
    #scheduled;
    #inProgress;
    #completed;
    #cancelled;
  };

  type OldServiceType = {
    #eyeTest;
    #frameTryOn;
    #combined;
  };

  type OldRepairType = {
    #adjustment;
    #screwTightening;
    #lensReplacement;
    #other;
  };

  type OldBooking = {
    id : Int;
    bookingType : OldBookingType;
    customer : Principal;
    provider : ?Principal;
    status : OldBookingStatus;
    serviceType : ?OldServiceType;
    repairType : ?OldRepairType;
    details : ?Text;
    address : ?Text;
    preferredTime : ?Text;
    price : OldPriceInfo;
    createdAt : Int;
    updatedAt : Int;
    mobileNumber : ?Text;
  };

  type OldPriceInfo = {
    baseFee : Nat;
    addOns : Nat;
    total : Nat;
  };

  type OldProvider = {
    id : Principal;
    name : Text;
    contact : Text;
    serviceAreas : Text;
    services : [OldServiceType];
    availability : Text;
    active : Bool;
  };

  type OldRentalItem = {
    id : Int;
    name : Text;
    category : Text;
    pricePerDay : Nat;
    deposit : Nat;
    available : Bool;
  };

  type OldUserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  type OldActor = {
    bookings : Map.Map<Int, OldBooking>;
    providers : Map.Map<Principal, OldProvider>;
    rentalCatalog : Map.Map<Int, OldRentalItem>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  // Define new state type
  type NewBookingType = {
    #mobileOptician;
    #repair;
    #rental;
  };

  type NewBookingStatus = {
    #pending;
    #accepted;
    #scheduled;
    #inProgress;
    #completed;
    #cancelled;
  };

  type NewServiceType = {
    #eyeTest;
    #frameTryOn;
    #combined;
  };

  type NewRepairType = {
    #adjustment;
    #screwTightening;
    #lensReplacement;
    #other;
  };

  type NewBooking = {
    id : Int;
    bookingType : NewBookingType;
    customer : Principal;
    provider : ?Principal;
    status : NewBookingStatus;
    serviceType : ?NewServiceType;
    repairType : ?NewRepairType;
    details : ?Text;
    address : ?Text;
    preferredTime : ?Text;
    price : NewPriceInfo;
    createdAt : Int;
    updatedAt : Int;
    mobileNumber : ?Text;
  };

  type NewPriceInfo = {
    baseFee : Nat;
    addOns : Nat;
    total : Nat;
  };

  type NewProvider = {
    id : Principal;
    name : Text;
    phone : Text;
    email : Text;
    serviceAreas : Text;
    services : [NewServiceType];
    availability : Text;
    active : Bool;
  };

  type NewRentalItem = {
    id : Int;
    name : Text;
    category : Text;
    pricePerDay : Nat;
    deposit : Nat;
    available : Bool;
  };

  type Gender = {
    #male;
    #female;
    #other;
  };

  type FrameShape = {
    #round;
    #square;
    #rectangular;
    #catEye;
    #aviator;
    #wayfarer;
    #oval;
  };

  type NewUserProfile = {
    name : Text;
    age : Nat;
    address : Text;
    gender : Gender;
    phone : Text;
    email : Text;
    framePreferences : ?[FrameShape];
    profilePicture : ?Storage.ExternalBlob;
    prescriptionPicture : ?Storage.ExternalBlob;
  };

  type NewActor = {
    bookings : Map.Map<Int, NewBooking>;
    providers : Map.Map<Principal, NewProvider>;
    rentalCatalog : Map.Map<Int, NewRentalItem>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let newProviders = old.providers.map<Principal, OldProvider, NewProvider>(
      func(_id, oldProvider) {
        {
          oldProvider with
          phone = oldProvider.contact;
          email = "";
        };
      }
    );

    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_id, oldProfile) {
        {
          name = oldProfile.name;
          age = 0;
          address = "";
          gender = #other : Gender;
          phone = oldProfile.phone;
          email = oldProfile.email;
          framePreferences = null;
          profilePicture = null;
          prescriptionPicture = null;
        };
      }
    );

    {
      old with
      providers = newProviders;
      userProfiles = newUserProfiles;
    };
  };
};
