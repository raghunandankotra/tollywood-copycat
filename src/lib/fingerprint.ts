import { v4 as uuidv4 } from 'uuid';

const FINGERPRINT_KEY = 'tcopy_fingerprint';

/**
 * Gets or creates a unique fingerprint for anonymous voting.
 * Stored in localStorage for persistence.
 */
export function getFingerprint(): string {
    if (typeof window === 'undefined') return '';

    let fingerprint = localStorage.getItem(FINGERPRINT_KEY);
    
    if (!fingerprint) {
        fingerprint = uuidv4();
        localStorage.setItem(FINGERPRINT_KEY, fingerprint);
    }
    
    return fingerprint;
}
