<!DOCTYPE html>
<html lang="en">
<head>
    <title>ZardasFairfox</title>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <!-- Mobile Responsive -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />

    <!-- Windows phone tab color -->
    <meta name="msapplication-navbutton-color" content="#009688">
    <!-- Chrome for Android tab color -->
    <meta name="theme-color" content="#009688">
    <!-- Apple Safari icon -->
    <link rel="apple-touch-icon" href="img/icons/apple-touch-icon.png">
    <!-- Safari 9 Pinned tabs in El Capitan (Slightly broken svg!) -->
    <link rel="mask-icon" href="img/icons/safariPinnedTab.svg" color="#009688">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="Summary" />
    <meta name="twitter:site" content="@TwitterHandle" />
    <meta name="twitter:title" content="Title" />
    <meta name="twitter:description" content="200 char description" />
    <meta name="twitter:image" content="Image" />

    <!-- Facebook Open Graph -->
    <meta property="og:url" content="http://www.example.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="13 amazing facts about metatags" />
    <meta property="og:description" content="8 reasons metatags will change the way you think about everything" />
    <meta property="og:image" content="1200x627 > 5mb image url" />

    <!-- Pinterest Image Ownership -->
    <meta name="p:domain_verify" content="key goes here" />

    <!-- TODO Figure out a way to automatically compile on http request -->
    <link rel="stylesheet" href="css/main.css" />

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='https://www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','__UA-XXXXX-X__','auto');ga('send','pageview');
    </script>

    <!-- Multilingual - Uncomment supported languages -->
    <link rel="alternate" href="/es/" hreflang="es" />
</head>
<body>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/project1">Project 1</a></li>
            <li><a href="/project2">Project 2</a></li>
        </ul>
    </nav>

    <main>
        <h1>Rachel's Site</h1>
        <a href="/project1">
            <p>Project 1</p>
        </a>
        <a href="/project2">
            <p>Project 2</p>
        </a>

        <!--<a href="mailto:someone@yoursite.com?cc=someoneelse@theirsite.com, another@thatsite.com, me@mysite.com&bcc=lastperson@theirsite.com&subject=Big%20News&body=Body-goes-here">Email Us</a>
        <a href="tel:1-408-555-5555">+1 (408) 555-5555</a> -->
    </main>

    <footer>
        <p>Copyright &copy; <?= date("Y") ?> Rachel Pappalardo. All Rights Reserved.</p>
    </footer>

    <!-- Try CDN and if fails, load local copy -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script>window.jQuery || document.write('<script src="js/lib/jquery-3.1.1.min.js">\x3C/script>')</script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha256-U5ZEeKfGNOja007MMD3YBI0A3OSZOQbeG6z2f2Y0hu8=" crossorigin="anonymous"></script>
    <script>$.fn.modal || document.write('<script src="js/lib/bootstrap.min.js">\x3C/script>')</script>

    <!-- TODO figure out page specific js -->
    <script src="js/example.js"></script>
</body>
</html>
