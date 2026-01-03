export const formatters = {
  formatPhone: (phone: string) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5, 10)}`;
  },

  formatCurrency: (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  },

  formatDate: (date: Date) => {
    return new Intl.DateTimeFormat('en-IN').format(date);
  },

  formatAddress: (address: any) => {
    if (!address) return '';
    const parts = [address.name, address.city, address.state, address.postalCode].filter(Boolean);
    return parts.join(', ');
  },
};
