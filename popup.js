function injectContent(){
    if(!document.querySelector('.berryRenderContainer')){
        const placeHolder = document.querySelectorAll('.css-z1vtgz');
        const placeHolderBerries = document.querySelectorAll('.css-16073o4');

        const berryRender = document.createElement('span');
        berryRender.className = 'berryRenderContainer';
        placeHolderBerries[0].insertAdjacentElement('afterbegin', berryRender);

        const resultElement = document.createElement('p');
        resultElement.textContent = 'Calculating...';
        resultElement.className = 'MuiTypography-root MuiTypography-body1 css-16073o4 tokenRender';

        placeHolder[1].insertAdjacentElement('afterend', resultElement);
    }

    function loopData() {
        const elementsWithClass = document.querySelectorAll('.css-1oh2wm');
        const assetsValues = document.querySelectorAll('.css-16073o4');
        const berriesValue = assetsValues[0];
      
        if (elementsWithClass.length >= 2) {
          const berryElement = elementsWithClass[0];
          const tokenElement = elementsWithClass[1];
      
          const getNumericValue = (element) => {
            const text = element.textContent.trim();
            const numericValue = parseFloat(text.replace(/\$|,/g, ''));
            return isNaN(numericValue) ? 0 : numericValue;
          };
      
          function getBpetValue(berryValue) {
            const css16073o4Element = document.querySelector('.css-16073o4');
            if (css16073o4Element) {
              const dollarValueWithSpan = css16073o4Element.innerHTML.trim(); // Obtenez tout le contenu HTML
              const dollarValueWithoutSpan = dollarValueWithSpan.replace(/<span[^>]*>.*<\/span>/g, ''); // Supprimez la balise span et son contenu
              const numericValue = parseFloat(dollarValueWithoutSpan.replace('$', '').replace(',', ''));
              
              if (!isNaN(numericValue) && berryValue !== 0) {
                const result = numericValue / berryValue;
                return result;
              }
            }
            return null;
          }
                   
      
          const updateContent = () => {
            const berryValue1 = getNumericValue(berryElement);
            const tokenValue1 = getNumericValue(tokenElement);
      
            setTimeout(() => {
              const berryValue2 = getNumericValue(berryElement);
              const tokenValue2 = getNumericValue(tokenElement);
      
              const deltaBerry = berryValue2 - berryValue1;
              const deltaToken = tokenValue2 - tokenValue1;
      
              const resultBerry = (deltaBerry * 3600).toFixed(2);
              const resultToken = (deltaToken * 3600).toFixed(2);
      
              const bpetValue = getBpetValue(berryValue2) * tokenValue2;
              const displayBpetValue = '$' + bpetValue.toFixed(2);
      
              document.querySelector('.berryRenderContainer').textContent = resultBerry+'/h ';
      
              document.querySelector('.tokenRender').textContent = `${resultToken}/h (${displayBpetValue})`;
    
            }, 800);
          };
      
          updateContent();
          setInterval(updateContent, 5000); // Exécute updateContent toutes les 5 secondes
        }
      }

    loopData();
}
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: injectContent,
    }).then(() => console.log('Injected a function!'));
  });
  