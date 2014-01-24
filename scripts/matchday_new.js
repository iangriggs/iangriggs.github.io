function getResponse(apiUrl, callback) {

    $.ajax({
      url: apiUrl,
      dataType: 'json',
      type: 'get',
      beforeSend: function(request) {
      	
      },
      success: function(data) {
      	callback(data);
      	console.log(data);
      	localStorage['data'] = JSON.stringify(data);
      },
      error: function(data) {
      	var data = localStorage["data"];
        if (data){
          callback(JSON.parse(localStorage["data"]));
        }else{
        	document.getElementsByClassName('prog-headlines')[0].innerHTML = '<p>We\'re really sorry but we can not retrieve news items at this current time, please check your internet connection';
        }
      }
    });
}

var isiOS = (navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null) ? true : false;

function makeArticleMarkup(newsItems) {
	var articleDiv = document.getElementsByClassName('prog-headlines');
	var articleMarkup = '';
	for (i=0; i<newsItems.length; i++) {
		
		//parse and split content into paragraphs
		var articleContent = parseContent(newsItems[i].content);
		//parse time to readable format
		var articleTime = parseTime(newsItems[i].updated_at);
		
		var articleImage;
		//display image if set
		if (newsItems[i].image_url !== null) {
			articleImage = '<img src="'+newsItems[i].stored_image_path+'" alt="" />';
		
		//else display video if set
		} else if (newsItems[i].video_thumbnail_url !== '') {

			if (isiOS) {
				articleImage = '<video controls poster="'+newsItems[i].video_thumbnail_url+'"><source src="'+newsItems[i].video_url_hls+'" type="video/hls"></video>';
			} else {
				articleImage = '<video controls poster="'+newsItems[i].video_thumbnail_url+'"><source src="'+newsItems[i].video_url_web+'" type="video/mp4"></video>';
			}

		//else diplay nothing
		} else {
			articleImage = '';
		}

		articleMarkup += '<article class="news-item" data-articleid="'+newsItems[i]._id+'"><figure>'+articleImage+'</figure><small class="time">'+articleTime+'</small><h1>'+newsItems[i].title+'</h1><p>'+articleContent+'</p></article>';
	}

	// var articlesInDom = document.getElementsByClassName('news-item');
	// console.log(articlesInDom.length);
	// if (articlesInDom.length > 2) {
	// 	articleMarkup += '<a href="#" class="show">Show More...</a>';
	// 	$('.news-item:gt(2)').hide();
	// 	$('.show').on('click', function(){
	// 	  $('.news-item:visible:last').nextAll(':lt(3)').show();
	// 	});
	// }
	articleDiv[0].innerHTML = articleMarkup;
}

function parseContent(content) {
	var paragraphs;
	var concatenated = '';
	paragraphs = content.split("\n\r");
	for (z=0; z<paragraphs.length; z++) {
		concatenated += '<p>'+paragraphs[z]+'</p>';
	}
	return concatenated;
}

function parseTime(timestamp) {
	var dateText = '';
	var theDate = new Date(timestamp);
	var theDay = theDate.getDate();
	var theMonth = getMonthText(theDate.getMonth());
	var theYear = theDate.getFullYear();
	dateText = theDay+'&nbsp;'+theMonth+'&nbsp;'+theYear;
	return dateText;
}

function getMonthText(monthNumber) {
	var monthText;
	switch(monthNumber) {
		case 0:
		monthText = 'Jan';
		break;
		case 1:
		monthText = 'Feb';
		break;
		case 2:
		monthText = 'Mar';
		break;
		case 3:
		monthText = 'Apr';
		break;
		case 4:
		monthText = 'May';
		break;
		case 5:
		monthText = 'June';
		break;
		case 6:
		monthText = 'July';
		break;
		case 7:
		monthText = 'Aug';
		break;
		case 8:
		monthText = 'Sept';
		break;
		case 9:
		monthText = 'Oct';
		break;
		case 10:
		monthText = 'Nov';
		break;
		case 11:
		monthText = 'Dec';
		break;
	}
	return monthText;
}