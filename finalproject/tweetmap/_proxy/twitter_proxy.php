<?php

    if (!isset($_GET['q'])) {
        header('HTTP/1.0 204 No Content');
        die();
    }
    if (!isset($_GET['callback'])) {
        header('HTTP/1.0 204 No Content');
        die();
    }

    header('Content-Type: application/json');

    include 'twitter_config.php';
    require_once ('codebird.php');
    Codebird::setConsumerKey($twitter_app_consumerKey, $twitter_app_consumerSecret); // static, see 'Using multiple Codebird instances'
    Codebird::setBearerToken('AAAAAAAAAAAAAAAAAAAAAENSNwAAAAAA9oj6584SANouN5GfUe14B0eqvJg%3DESjNl6zsR28LEWpHPPDwCW03CDmpQ7qMPcgKUCbEBM');
    $cb = Codebird::getInstance();
    $cb->setToken($twitter_app_accessToken, $twitter_app_accessSecret);


    // if (!isset($_SESSION['bearer_token'])) {
    //     $reply = $cb->oauth2_token();
    //     $_SESSION['bearer_token'] = $reply->access_token;
    // }

    // $cb->setBearerToken($_SESSION['bearer_token']);

    function buildUrl () {
        $url = array();
        foreach ($_GET as $key => $value) {
            if ($key !== 'callback' && $key !== 'optim' && $key !== 'debug') {
                array_push($url, $key . '=' . urlencode($value));
            }
        }
        return implode($url, '&');
    }

    $searchResultsQuery = $cb->search_tweets(buildUrl(), true);
    // $searchResultsQuery = $cb->statuses_homeTimeline();
    $searchResults = array();

    // echo $_SESSION['bearer_token'];

    // print_r($searchResultsQuery);
    // die();

    if ($_GET['debug']) {
        print_r($searchResultsQuery);
        die();
    }

    if ($_GET['optim'] === 'no') {
        $searchResults = $searchResultsQuery->statuses;
        $json = array('results' => $searchResults);
        $json = json_encode($json);
        echo $_GET['callback'] . '(' . $json . ')';
    } else {
        foreach ($searchResultsQuery->statuses as $key => $value) {
            if ($value->coordinates) {
                // $user = array(
                //     'id' => $value->user->id,
                //     'name' => $value->user->name,
                //     'screen_name' => $value->user->screen_name,
                //     'location' => $value->user->location
                // );

                $status = array(
                    'id' => $value->id,
                    'created_at' => $value->created_at,
                    'text' => $value->text,
                    'geo' => $value->geo,
                    'coordinates' => $value->coordinates,
                    'place' => $value->place,
                    'user' => $value->user,
                    'entities' => $value->entities
                );

                array_push($searchResults, $status);
            }
        }

        if (count($searchResults) > 0) {
            $json = array('results' => $searchResults);
            $json = json_encode($json);
            echo $_GET['callback'] . '(' . $json . ')';
        } else {
            header('HTTP/1.0 204 No Content');
            die();
        }
    }
?>