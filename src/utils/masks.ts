const applyMask = (value: string, type: string): string => {
  switch (type) {
    case 'cpf':
      return value
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1-$2') 
        .substring(0, 14); 
    case 'cnpj':
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 18);
    case 'telefone':
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 15);
    case 'currency': {
      const numericValue = parseInt(value.replace(/\D/g, ''), 10) / 100;
      let formattedValue = numericValue.toFixed(2); 
      formattedValue = formattedValue.replace('.', ','); 
      formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); 
      return `R$ ${formattedValue}`;
    }
    default:
      return value;
  }
};

export default applyMask;