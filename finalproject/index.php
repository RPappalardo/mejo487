<!DOCTYPE html>
<html>
<title>Net Neutrality</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link type="text/css" rel="stylesheet" href="/finalproject/css/styles.css">
<link rel="stylesheet" href="finalproject/tweetmap/tweetMap-1.1.0.min.css">

<body>

<!-- Navbar (sit on top) -->
<div class="w3-top">
  <div class="w3-bar" id="myNavbar">
    <a class="w3-bar-item w3-button w3-hover-black w3-hide-medium w3-hide-large w3-right" href="javascript:void(0);" onclick="toggleFunction()" title="Toggle Navigation Menu">
      <i class="fa fa-bars"></i>
    </a>
    <a href="#home" class="w3-bar-item w3-button">HOME</a>
    <a href="#about" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-user"></i> ABOUT</a>
    <a href="#portfolio" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-th"></i> DATA</a>
    <a href="#contact" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-envelope"></i> CONTACT</a>
    <a href="#" class="w3-bar-item w3-button w3-hide-small w3-right w3-hover-red">
      <i class="fa fa-search"></i>
    </a>
  </div>

  <!-- Navbar on small screens -->
  <div id="navDemo" class="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium">
    <a href="#about" class="w3-bar-item w3-button" onclick="toggleFunction()">ABOUT</a>
    <a href="#portfolio" class="w3-bar-item w3-button" onclick="toggleFunction()">DATA</a>
    <a href="#contact" class="w3-bar-item w3-button" onclick="toggleFunction()">CONTACT</a>
    <a href="#" class="w3-bar-item w3-button">SEARCH</a>
  </div>
</div>

<!-- First Parallax Image with Logo Text -->
<div class="bgimg-1 w3-display-container w3-opacity-min" id="home">
  <div class="w3-display-middle" style="white-space:nowrap;">
    <span class="w3-center w3-padding-large w3-black w3-xlarge w3-wide w3-animate-opacity">Net<span class="w3-hide-small"></span>Neutrality</span>
  </div>
</div>

<!-- Container (About Section) -->
<div class="w3-content w3-container w3-padding-64" id="about">
  <h3 class="w3-center">What's Going On?</h3>
  <p class="w3-center"><em>I love the interwebzzz</em></p>
  <p>The term was coined by Columbia University media law professor Tim Wu in 2003, as an extension of the longstanding concept of a common carrier,
    which was used to describe the role of telephone systems.
    Net neutrality is the principle that internet service providers and governments regulating most of the Internet must treat all data on the
  Internet the same, and not discriminate or charge differently by user, content, website, platform, application, type of
  attached equipment, or method of communication. For instance, under these principles, internet service providers are
  unable to intentionally block, slow down or charge money for specific websites and online content.
  Therefore, this doesn't mean loading Netflix on a 25-megabits-per-second connection just as quickly as on a 100-megabits-per-second
    connection; it means treating Netflix and Hulu the same on whichever kind of connection a consumer has.</p>
  <div class="w3-row">
    <div class="w3-col m6 w3-center w3-padding-large">
      <p><b><i class="fa fa-user w3-margin-right"></i>Tweets</b></p><br>
<div  width="500" height="333" style ="overflow:auto;border:8px solid yellowgreen;padding:2%">
  <?php
  ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

  /** Set access tokens here - see: https://dev.twitter.com/apps/ **/
  $settings = array(
      'oauth_access_token' => "702336877408468992-Lxmaj1s5oVS2u7N5R0X4eWLNaftXiq8",
      'oauth_access_token_secret' => "OrGBEBmqbZ74ZcB0lqcU76wGpIH5UOlp5ASGnjeSpin5v",
      'consumer_key' => "Y94KGzLxQoyWHzQBiEUigLtdL",
      'consumer_secret' => "2B5B1D6ky8fegj9SG2ff6Eosi9AHBS9kUA65WeW75fw5TkSFdi"
  );

  $url = 'https://api.twitter.com/1.1/search/tweets.json';
  $getfield = '?q=netneutrality';
  $requestMethod = 'GET';
  $twitter = new TwitterAPIExchange($settings);
  $tweetData = json_decode($twitter->setGetfield($getfield)
               ->buildOauth($url, $requestMethod)
               ->performRequest(), $assoc=TRUE);

  foreach($tweetData['statuses'] as $index => $items){
    $userArray = $items['user'];
    echo '<a href="https://twitter.com/' . $userArray['screen_name'] . '"><img class="img-circle" src="'. $userArray['profile_image_url'] . '"></a>';
    echo $items['text']. "<br />";
    // echo $userArray['profile_image_url']. "<br />";
  }
  ?>
</div>
    </div>

    <!-- Hide this text on small devices -->
    <div class="w3-col m6 w3-hide-small w3-padding-large">
      <p>
A widely cited example of a violation of net neutrality principles was the Internet service provider Comcast's secret slowing ("throttling") of uploads from peer-to-peer file sharing (P2P) applications by using
 forged packets. Comcast did not stop blocking these protocols, like BitTorrent, until the FCC ordered them to stop.In another minor example, The Madison River Communications company was fined US$15,000 by the
 FCC, in 2004, for restricting their customers' access to Vonage, which was rivaling their own services. ATandT was also caught limiting access to FaceTime, so only those users who paid for ATandT's new shared data
 plans could access the application.In July 2017, Verizon Wireless was accused of throttling after users noticed that videos played on Netflix and Youtube were slower than usual, though Verizon commented that it
  was conducting "network testing" and that net neutrality rules permit "reasonable network management practices".
Research suggests that a combination of policy instruments will help realize the range of valued political and economic objectives central to the network neutrality debate.Combined with strong public opinion, this
has led some governments to regulate broadband Internet services as a public utility, similar to the way electricity, gas, and the water supply are regulated, along with limiting providers and regulating the options
 those providers can offer. </p>
    </div>
  </div>
  <p class="w3-large w3-center w3-padding-16">Poll of people who support net neutrality from Mozilla and research firm Ipsos:</p>
  <p class="w3-wide"><i class="fa fa-laptop"></i>Americans</p>
  <div class="w3-light-grey">
    <div class="w3-container w3-padding-small w3-dark-grey w3-center" style="width:76%">76%</div>
  </div>
  <p class="w3-wide"><i class="fa fa-laptop"></i>Democrats</p>
  <div class="w3-light-grey">
    <div class="w3-container w3-padding-small w3-dark-grey w3-center" style="width:85%">81%</div>
  </div>
  <p class="w3-wide"><i class="fa fa-laptop"></i>Republicans</p>
  <div class="w3-light-grey">
    <div class="w3-container w3-padding-small w3-dark-grey w3-center" style="width:73%">73%</div>
  </div>
</div>

<div class="w3-row w3-center w3-dark-grey w3-padding-16">
  <div class="w3-quarter w3-section">
    <span class="w3-xlarge">24%</span><br>
    Strongly Support
  </div>
  <div class="w3-quarter w3-section">
    <span class="w3-xlarge">37%</span><br>
    Somewhat Support
  </div>
  <div class="w3-quarter w3-section">
    <span class="w3-xlarge">13%</span><br>
    Somewhat Oppose
  </div>
  <div class="w3-quarter w3-section">
    <span class="w3-xlarge">5%</span><br>
    Strongly Oppose
  </div>
</div>

<!-- Second Parallax Image with Portfolio Text -->
<div class="bgimg-2 w3-display-container w3-opacity-min">
  <div class="w3-display-middle">
    <span class="w3-xxlarge w3-text-white w3-wide"></span>
  </div>
</div>

<!-- Container (Portfolio Section) -->
<div class="w3-content w3-container w3-padding-64" id="portfolio">
  <h3 class="w3-center">Data</h3>
  <p class="w3-center"><em>Here are some of the latest data.<br> Click on the images to make them bigger</em></p><br>

  <!-- Responsive Grid. Four columns on tablets, laptops and desktops. Will stack on mobile devices/small screens (100% width) -->
  <div class="w3-row-padding w3-center">
    <div class="w3-col m3">
      <img src="" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="The mist over the mountains">
    </div>

    <div class="w3-col m3">
      <img src="" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="Coffee beans">
    </div>

    <div class="w3-col m3">
      <img src="" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="Bear closeup">
    </div>

    <div class="w3-col m3">
      <img src="" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="Quiet ocean">
    </div>
  </div>

  <div class="w3-row-padding w3-center w3-section">
    <div class="w3-col m3">
      <img src="" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="The mist">
    </div>

    <div class="w3-col m3">
      <img src="" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="My beloved typewriter">
    </div>

    <div class="w3-col m3">
      <img src="" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="Empty ghost train">
    </div>

    <div class="w3-col m3">
      <img src="" style="width:100%" onclick="onClick(this)" class="w3-hover-opacity" alt="Sailing">
    </div>
    <button class="w3-button w3-padding-large w3-light-grey" style="margin-top:64px">LOAD MORE</button>
  </div>
</div>

<!-- Modal for full size images on click-->
<div id="modal01" class="w3-modal w3-black" onclick="this.style.display='none'">
  <span class="w3-button w3-large w3-black w3-display-topright" title="Close Modal Image"><i class="fa fa-remove"></i></span>
  <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
    <img id="img01" class="w3-image">
    <p id="caption" class="w3-opacity w3-large"></p>
  </div>
</div>

<!-- Third Parallax Image with Portfolio Text -->
<div class="bgimg-3 w3-display-container w3-opacity-min">
  <div class="w3-display-middle">
     <span class="w3-xxlarge w3-text-white w3-wide"></span>
  </div>
</div>

<!-- Container (Contact Section) -->
<div class="w3-content w3-container w3-padding-64" id="contact">
  <h3 class="w3-center">How to Help</h3>
  <p class="w3-center"><em>Your support is needed!</em></p>

  <div class="w3-row w3-padding-32 w3-section">
    <div class="w3-col m4 w3-container">
      <!-- Add Google Maps -->
      <div id="googleMap" class="w3-round-large w3-greyscale" style="width:100%;height:400px;"></div>
    </div>
    <div class="w3-col m8 w3-panel">
    <div class="w3-large w3-margin-bottom">
        <i class="fa fa-map-marker fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> UNC, US<br>
        <i class="fa fa-phone fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Phone: +000 000 000<br>
        <i class="fa fa-envelope fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Email: mail@mail.com<br>
      </div>
      <p>Swing by for a cup of <i class="fa fa-coffee"></i>, send a message to help defend net neutrality:</p>
      <form action="/action_page.php" target="_blank">
        <div class="w3-row-padding" style="margin:0 -16px 8px -16px">
          <div class="w3-half">
            <input class="w3-input w3-border" type="text" placeholder="Name" required name="Name">
          </div>
          <div class="w3-half">
            <input class="w3-input w3-border" type="text" placeholder="Email" required name="Email">
          </div>
        </div>
        <input class="w3-input w3-border" type="text" placeholder="Message" required name="Message">
        <button class="w3-button w3-black w3-right w3-section" type="submit">
          <i class="fa fa-paper-plane"></i> SEND MESSAGE
        </button>
      </form>
    </div>
  </div>
</div>

<!-- Footer -->
<footer class="w3-center w3-black w3-padding-64 w3-opacity w3-hover-opacity-off">
  <a href="#home" class="w3-button w3-light-grey"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a>
  <div class="w3-xlarge w3-section">
    <i class="fa fa-facebook-official w3-hover-opacity"></i>
    <i class="fa fa-instagram w3-hover-opacity"></i>
    <i class="fa fa-snapchat w3-hover-opacity"></i>
    <i class="fa fa-pinterest-p w3-hover-opacity"></i>
    <i class="fa fa-twitter w3-hover-opacity"></i>
    <i class="fa fa-linkedin w3-hover-opacity"></i>
  </div>
</footer>

<script src="/finalproject/js/scripts.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=[insert-key-here]"></script>
<script src="finalproject/tweetmap/tweetMap-1.1.0.min.js"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqUTjUNy4oRgD9GJFQEjhiCbY5_F8u2_k&callback=myMap"></script>

</body>
</html>
