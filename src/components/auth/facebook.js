import React, { Component, PropTypes } from 'react';

const FacebookLogin = () => {
  window.fbAsyncInit = () => {
    FB.init({
      appId: '157524328028332',
      cookie: true,
      xfbml: true,
      version: 'v2.8',
    });
  };



  function myFacebookLogin() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        console.log('Logged in.');
        FB.api('/me/feed', (response) => {
          console.log(JSON.stringify(response));
        });
      }
    });
  }

  return (
    <div id="fb-root">
      <button
        className="fb-login-button"
        data-max-rows="1"
        data-size="medium"
        data-show-faces="false"
        data-auto-logout-link="true"
        onClick={myFacebookLogin}
      />
    </div>
  );
};

(function (d, s, id) {
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  const js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=157524328028332';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

export default FacebookLogin;

