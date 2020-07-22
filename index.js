const trace = res => {console.log(res); return res;};
const toJson = res => res.json();
const tail = res => {const [head, ...tail] = res; return tail;};
const simplifyData = res => { const { D1N, D3N, D4N, V } = res; return { Regiao : D1N, Ano : D3N, Doenca : D4N, Valor : V };}
const map = fn => arr => arr.map(fn);
const filter = fn => arr => arr.filter(fn);
const filterByRegion = region => arr => arr.Regiao === region;
const filterBySick = sick => arr => arr.Doenca === sick;
const prop = property => obj => obj[property];

const agreggateByDoenca = arr => arr.reduce((resultado, item) => {
  const { Doenca } = item;
  if (resultado.hasOwnProperty(Doenca)) resultado[Doenca].push(item);
  else resultado[Doenca] = [item];
  return resultado;
}, {});

const buttonRegion = document.querySelector('.byRegion');
const buttonState = document.querySelector('.byState');
const buttonSick = document.querySelector('.bySick');

const graphBy = (evt) => {

  const param = evt.target.attributes['class'].nodeValue
  const search = document.getElementById(param).value;
  console.log(search)

  if(search !== 'Escolha' && param !== 'bySick'){
  url.then(filter(filterByRegion(search)))
  .then(tail)
  .then(tail)
  .then(generateData)
  .then(drawPieChart)
  }
  else if(search !== 'Escolha'){
    url.then(agreggateByDoenca)
    .then(trace)
    .then(prop(search))
    .then(tail)
    .then(trace)
    .then(generateDataRegion)
    .then(drawPieChart)
  }

};
const generateData = dados => {
    const data = {
      datasets: [{
        data: dados.map(x => x.Valor)
      }],
      labels: dados.map(x => x.Doenca)
    };
    return data;
};

const generateDataRegion = dados => {
  const data = {
    datasets: [{
      data: dados.map(x => x.Valor)
    }],
    labels: dados.map(x => x.Regiao)
  };
  return data;
};


const drawDoughnutChart = data => {
    const ctx = document.getElementById('Brasil');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Quantidade de Doenças',
          data: data.datasets[0].data,
          backgroundColor: [
            'rgba(246, 44, 145)',
            'rgba(243, 149, 149',
            'rgba(251, 230, 38)',
            'rgba(134, 217, 142',
            'rgba(29, 25, 255)',
            'rgba(247, 132, 17)',
            'rgba(77, 214, 248)',
            'rgba(15, 157, 98)',
            'rgba(119, 102, 58)',
            'rgba(128, 8, 8)',
            'rgba(232, 38, 38)',
            'rgba(19, 154, 164)',
            'rgba(124, 46, 213)',
            'rgba(186, 148, 243)',
            'rgb(192, 152, 5)',
            'rgb(56, 255, 201)'
          ],
        }]
      },
      options: {
        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'black'
            }
        }
    }
  });
};

const fixedurl = fetch('http://api.sidra.ibge.gov.br/values/t/354/g/2/v/allxp/p/all/c12963/all?formato=json')
    .then(toJson)
    .then(tail)
    .then(map(simplifyData))
    .then(filter(filterByRegion('Brasil')))
    .then(tail)
    .then(tail)
    .then(generateData)
    .then(drawDoughnutChart);

const drawPieChart = data => {
  const ctx = document.getElementsByClassName('selected');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Quantidade de Doenças',
        data: data.datasets[0].data,
        backgroundColor: [
          'rgba(246, 44, 145)',
          'rgba(243, 149, 149',
          'rgba(251, 230, 38)',
          'rgba(134, 217, 142',
          'rgba(29, 25, 255)',
          'rgba(247, 132, 17)',
          'rgba(77, 214, 248)',
          'rgba(15, 157, 98)',
          'rgba(119, 102, 58)',
          'rgba(128, 8, 8)',
          'rgba(232, 38, 38)',
          'rgba(19, 154, 164)',
          'rgba(124, 46, 213)',
          'rgba(186, 148, 243)',
          'rgb(192, 152, 5)',
          'rgb(56, 255, 201)'
        ],
      }]
    },
    options: {
      legend: {
          labels: {
              // This more specific font property overrides the global property
              fontColor: 'black'
          }
      }
    }
  });
};


const url = fetch('http://api.sidra.ibge.gov.br/values/t/354/g/2/v/allxp/p/all/c12963/all?formato=json')
    .then(toJson)
    .then(tail)
    .then(map(simplifyData));

const init = () =>{
buttonRegion.addEventListener('click', graphBy);
buttonState.addEventListener('click', graphBy);
buttonSick.addEventListener('click', graphBy)
};

init();