export const COUNTRY_RULES: Record<string, number> = {
    '+380': 9,
    '+1': 10,
    '+44': 10,
    '+81': 10
};

export const formatPhoneToRegular = (phone: string) => {
    return phone.replace(/[\s-]/g, '');
}

export const formatPhoneNumber = (value: string, countryCode: string): string => {
    const digits = value.replace(/[^\d]/g, '').slice(0, countryCode.length + 12);
    const codeDigits = countryCode.replace(/[^\d]/g, '');
    const number = digits.startsWith(codeDigits) ? digits.slice(codeDigits.length) : digits;

    if (!number) return countryCode;
  
    const parts = [
      number.slice(0, 3),
      number.slice(3, 6),
      number.slice(6, 8),
      number.slice(8, 12),
    ].filter(Boolean);
  
    return `${countryCode} ${parts.join('-')}`.trim();
};

interface ValidationParams {
    l: number;
    l_required: number;
    l_completed: boolean;
}
/**
 * Returns a validation object for the phone number.
 * l: current phone length without country code.
 * l_required: required phone length by selected country
 * l_completed: current phone length correspond to required
 * @param phone - The phone number to validate (e.g., '+380123456789').
 * @param countryCode - The country code (e.g., '+380').
 * @returns {ValidationParams} An object containing validation results.
 */
export const validationPhoneNumber = (phone: string, countryCode: string): ValidationParams => {
    const digits = phone.replace(/[^\d]/g, '');
    const codeDigits = countryCode.replace(/[^\d]/g, '');
    const numberLength = digits.startsWith(codeDigits) 
      ? digits.length - codeDigits.length 
      : digits.length;
  
    const requiredLength = COUNTRY_RULES[countryCode] || 7;
    const validation = {
        l: numberLength,
        l_required: requiredLength,        
        l_completed: numberLength === requiredLength
    }

    return validation;
};
