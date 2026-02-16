import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RentalItem {
    id: bigint;
    name: string;
    deposit: bigint;
    available: boolean;
    pricePerDay: bigint;
    category: string;
}
export interface Booking {
    id: bigint;
    status: BookingStatus;
    serviceType?: ServiceType;
    provider?: Principal;
    customer: Principal;
    createdAt: bigint;
    repairType?: RepairType;
    updatedAt: bigint;
    address: string;
    bookingType: BookingType;
    preferredTime: string;
    details: string;
    price: PriceInfo;
}
export interface Provider {
    id: Principal;
    active: boolean;
    contact: string;
    name: string;
    availability: string;
    serviceAreas: string;
    services: Array<ServiceType>;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface PriceInfo {
    total: bigint;
    baseFee: bigint;
    addOns: bigint;
}
export enum BookingStatus {
    scheduled = "scheduled",
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    accepted = "accepted",
    inProgress = "inProgress"
}
export enum BookingType {
    rental = "rental",
    repair = "repair",
    mobileOptician = "mobileOptician"
}
export enum RepairType {
    adjustment = "adjustment",
    other = "other",
    screwTightening = "screwTightening",
    lensReplacement = "lensReplacement"
}
export enum ServiceType {
    eyeTest = "eyeTest",
    combined = "combined",
    frameTryOn = "frameTryOn"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignProviderToBooking(bookingId: bigint, providerId: Principal): Promise<void>;
    createOpticianBooking(serviceType: ServiceType, details: string, address: string, preferredTime: string, price: PriceInfo): Promise<bigint>;
    createRentalBooking(itemId: bigint, rentalPeriod: bigint, address: string, price: PriceInfo): Promise<bigint>;
    createRepairBooking(repairType: RepairType, details: string, address: string, preferredTime: string, price: PriceInfo): Promise<bigint>;
    findAvailableRentalItems(): Promise<Array<RentalItem>>;
    getActiveProviders(): Promise<Array<Provider>>;
    getAllBookings(): Promise<Array<Booking>>;
    getBooking(bookingId: bigint): Promise<Booking>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomerBookings(): Promise<Array<Booking>>;
    getProvider(providerId: Principal): Promise<Provider | null>;
    getProviderBookings(): Promise<Array<Booking>>;
    getRentalCatalog(): Promise<Array<RentalItem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initialize(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    onboardProvider(name: string, contact: string, serviceAreas: string, services: Array<ServiceType>, availability: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBookingStatus(bookingId: bigint, newStatus: BookingStatus): Promise<void>;
}
