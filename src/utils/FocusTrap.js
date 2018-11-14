const TARGET_ELEMENT = '.location-detail-page'

export const onFocus = () => {
    setTimeout(() => {
      let element = document.querySelector(TARGET_ELEMENT);
      element.focus();
    }, 500);
  }
