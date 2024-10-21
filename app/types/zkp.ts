export interface Proof {
    id : string;
    user_id : string;
    commitment : string;
    statement : string;
    created_at : string;
}

export interface Challenge {
    id : string ;
    user_id : string;
    challenge : string;
    expires_at : string;
    created_at : string;
}

export interface Verification {
    id : string;
    user_id : string;
    commitment : string;
    is_valid : boolean;
    verified_at : string;
}

export interface ProofGenerationResponse {
    secret : string;
    commitment : string;
}

export interface VerificationResponse {
    isValid : boolean;
}

export interface DashboardStats {
    activeChallenges: number;
    proofCount : number;
    verificationCount : number;
    successRate : number;
}