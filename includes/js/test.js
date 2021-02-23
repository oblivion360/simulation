fetch('includes/js/api/predictors.txt')
  .then(response => response.json())
  .then(data => {
    console.log(data.Predictors);
  });
