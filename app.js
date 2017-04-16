// bring in Express
var express = require('express');
var app = express();

// set up the Handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// tell express to find static files in the "public" directory
app.use(express.static('public'));

// --- blog data --- //
var blog = {
	posts: {
		'Gemini': {
			title: "Gemini Horoscope",
			body: "Your creativity is at an all-time high, Gemini, so take advantage of it. This would be an ideal day to paint or write. Even though you consider your talents well below amateur status, you may be surprised by what you're able to produce. Ignore your strict internal editor and work for the pure pleasure of creating. You will be delighted with the results."
		},
		'Cancer': {
			title: "Cancer Horoscope",
			body: "Your inspiration and creativity are high today, Cancer. If you've been thinking about taking up painting or poetry, this would be an ideal day to get started. Make sure your perfectionism doesn't get in the way of your creative urges. You can be a critical editor. For now, don't worry about the end product. If you enjoy the creative process, the end result will reflect your joy. "
		},
		'Leo': {
			title: "Leo Horoscope",
			body: "It's bad enough having too many cooks in the kitchen, but when those cooks argue not only about how to cook the meal but also about how to design the kitchen, you know you have trouble on your hands. Tempers are likely to flare today. Everyone has an opinion about how you should decorate your home. Whoever pays the mortgage gets to make the final decisions. That should settle it."
		},
		'Virgo': {
			title: "Virgo Horoscope",
			body: "Your self-confidence is at a low point these days, and this is making you especially vulnerable. It's likely that a recent confrontation with a close friend has you worrying about the overall health of the relationship. With all kindness, Virgo, you're overreacting. It's likely that your mate feels just as troubled as you right now. Why not meet halfway? "
		},
		'Libra': {
			title: "Libra Horoscope",
			body: "Your self-confidence is at a low point these days, and this is making you especially vulnerable. It's likely that a recent confrontation with a close friend has you worrying about the overall health of the relationship. With all kindness, Virgo, you're overreacting. It's likely that your mate feels just as troubled as you right now. Why not meet halfway? "
		},
		'Scorpio': {
			title: "Scorpio Horoscope",
			body: "Sometimes you can be too passive and let others trample all over you. Your lack of ego is admirable, but only up to a point, Scorpio. Why let others take credit for your ideas? There could be a situation where you feel compelled to speak up. Protect your rights and defend yourself against an unethical person intent on downplaying your contribution. Hold your ground and you will be vindicated. "
		},
		'Sagittarius': {
			title: "Sagittarius Horoscope",
			body: "An unethical acquaintance could be spreading unfounded rumors. Don't take anything you hear today at face value, Sagittarius. Get all the facts before drawing conclusions. Equipment being installed or acting up adds to the confusion. If the situation weren't so frustrating, it would be comical. Take deep breaths throughout the day. Tomorrow things will be on a more even keel. "
		}
	}
};

// --- ROUTES --- //

// Show all the posts
app.get('/',function(req,res){
	res.render('home',blog);
});

// Show one post
//   (fyi, "slug" is another name for a short title)
app.get('/post/:slug',function(req,res){
	// the value of :slug is available as req.params.slug
	var post = blog.posts[req.params.slug]; // uses bracket syntax because property name is inside a variable
	// if the post exists, render it
	if (post){
		res.render('single',post);
	} else { // else, send 404 error
		res.status(404);
		res.render('404');
	}

});

// 404 Not found catch-all handler
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 server error handler
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// start server
app.listen(3000, function(){
	console.log( 'Express started on http://localhost:3000; press Ctrl-C to terminate.' );
});
