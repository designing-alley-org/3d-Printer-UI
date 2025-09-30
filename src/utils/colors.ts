export function cardCss(tag: string | undefined) {
    switch (tag) {
        case "pending":
            return { 
                backgroundColor: '#F7E6B3',
                border: '1px solid #FFC71E'
             };
        case "confirmed":
            return { 
                backgroundColor: '#B9DEAA',
                border: '1px solid #31AE00'
             };
        case "completed":
            return { 
                backgroundColor: '#B8D0F7',
                border: '1px solid #2E7EFF'
            };
        case "ticket":
            return { 
                backgroundColor: '#EFC2C2',
                border: '1px solid #E00000'
            };
        default:
            return {};
    }
}

export function cardBadge(tag: string | undefined) {
    switch (tag) {
        case "pending":
            return { 
                backgroundColor: '#FFC71E',
                color: '#F7E6B3',
             };
        case "confirmed":
            return { 
                backgroundColor: '#31AE00',
                color: '#B9DEAA',
             };
        case "completed":
            return { 
                backgroundColor:'#2E7EFF',
                color: '#B8D0F7',
            };
        case "ticket":
            return { 
                backgroundColor: '#E00000',
                color: '#FFE5E5',
            };
        default:
            return {};
    }
}



export function bellCSS(tag: string | undefined) {
  switch (tag) {
    case 'pending':
      return {
        color: '#FFC71E',
      };
    case 'confirmed':
      return {
        color: '#31AE00',
      };
    case 'completed':
      return {
        color: '#2E7EFF',
      };
    case 'ticket':
      return {
        color: '#E00000',
      };
    default:
      return {};
  }
}