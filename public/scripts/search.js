// search bar jquery interactions

$(() => {

  $("#search").click(function() {
    $(".search-bar").slideDown('fast');
  });

  $("#search").click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("header").offset().top
    }, 500);
  });

  $("#hide-button").click(function() {
    $(".search-bar").slideUp('fast');
  });

  $(".search-bar form").submit(function(e) {
    e.preventDefault();
    const data = objectifyForm($(this).serializeArray());
    console.log('data :', data);
  });

});

// // search query
// const getSneakers = function(options) {

//   queryParams = [];

//   let queryString = `
//   SELECT *
//   FROM sneakers
//   `
//   if (options.brand) {
//     queryParams.push(`%${options.brand}%`);
//     queryString += `WHERE brand LIKE $${queryParams.length}`;
//   }

//   if (options.size && !options.brand) {
//     queryParams.push(Number(options.size));
//     queryString += `WHERE size = $${queryParams.length}`;
//   } else if (options.size && options.brand) {
//     queryParams.push(Number(options.size));
//     queryString += `AND size = $${queryParams.length}`;
//   }

//   if (options.city && !options.brand && !options.size) {
//     queryParams.push(`%${options.city}`);
//     queryString += `WHERE city LIKE $${queryParams.length}`;
//   } else if (options.city && (options.brand || options.size)) {
//     queryParams.push(`%${options.city}`);
//     queryString += `AND city LIKE $${queryParams.length}`;
//   }

//   if (options.min_price && !options.city && !options.brand && !options.size) {
//     queryParams.push(`%${options.min_price}`);
//     queryString += `WHERE price > $${queryString.length}`;
//   } else if (options.min_price && (options.city || options.brand || options.size)) {
//     queryParams.push(`%${options.min_price}`);
//     queryString += `AND price > $${queryString.length}`;
//   }

//   if (options.max_price && !options.min_price && !options.city && !options.brand && !options.size) {
//     queryParams.push(`%${options.max_price}`);
//     queryString += `WHERE price > $${queryString.length}`;
//   } else if (options.max_price && (options.min_price || options.city || options.brand || options.size)) {
//     queryParams.push(`%${options.max_price}`);
//     queryString += `AND price > $${queryString.length}`;
//   }
// }

// converts serializeArray into object
function objectifyForm(formArray) {
  var returnArray = {};
  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
};
