export class ValidationError {
  constructor(public control: string, public errorName: string, public errorValue: any) { }

  get description(): string {
    switch (this.errorName) {
      case 'required': return `${this.control} is required.`;
      case 'pattern': return `${this.control} has wrong pattern.`;
      case 'email': return `${this.control} has wrong email format.`;
      case 'minlength': return `${this.control} has wrong length, required minimum length: ${this.errorValue.requiredLength}.`;
      case 'maxlength': return `${this.control} has wrong length, required maximum length: ${this.errorValue.requiredLength}.`;
      case 'areEqual': return `${this.control} must be equal.`;
      default: return `${this.control} ${this.errorValue} (${this.errorName}).`;
    }
  }
}
