var blog_list = new Vue({
	el: '#js-grid-list',
	data: {
		// The layout mode, possible values are "grid" or "list".
		layout: 'grid',

		// demo data
		blog_posts: [{
			title: 'Tapping into UGC with Offerpop',
			url: 'https://voltagead.com/tapping-ugc-offerpop/',
			image: {
				'large': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/08/header-960x500-copy-960x500.jpg',
				'small': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/08/header-960x500-copy-300x300.jpg'
			}
		}, {
			title: '5 websites that get design right',
			url: 'https://voltagead.com/5-websites-get-design-right/',
			image: {
				'large': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/08/HERO-960x500.jpg',
				'small': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/08/HERO-300x300.jpg'
			}
		}, {
			title: 'Mariachis, Hats, and Pies, Oh My!',
			url: 'https://voltagead.com/mariachis-hats-pies-oh/',
			image: {
				'large': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/07/IMG_2629.2-960x582.jpg',
				'small': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/07/IMG_2629.2-300x300.jpg'
			}
		}, {
			title: 'Big buzz. Big brands. Reebok does omnichannel.',
			url: 'https://voltagead.com/big-buzz-big-brands-reebok-omnichannel/',
			image: {
				'large': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/07/reebok-hero2.jpg',
				'small': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/07/reebok-hero2-300x300.jpg'
			}
		}, {
			title: 'Colorado Ad Day',
			url: 'https://voltagead.com/denver-ad-day/',
			image: {
				'large': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/07/sample-blog-960x577.jpg',
				'small': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/07/sample-blog-300x300.jpg'
			}
		}, {
			title: 'Using the Ordinary to Build the Extraordinary',
			url: 'https://voltagead.com/using-ordinary-build-extraordinary/',
			image: {
				'large': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/header-960x500.jpg',
				'small': 'https://2e64oz2sjk733hqp882l9xbo-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/header-300x300.jpg'
			}
		}]
	}
});