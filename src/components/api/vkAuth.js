import React, { Component } from 'react';
import SvgIcon from 'vclub/components/icons/SvgIcon';
import VkIcon from './icon/vk-icon.svg';
import styles from './vkAuth.css';

export default class VKLogin extends Component {
  static propTypes = {
    onLogin: React.PropTypes.func.isRequired,
    idApp: React.PropTypes.number.isRequired,
  };
  componentDidMount() {
    VK.init({ apiId: this.props.idApp }, '5.62');
  }
  handleLoginClick = () => {
    VK.Auth.login((response) => {
      if (response.session) {
        const userId = response.session.mid;
        const optionsApi = { user_ids: userId, fields: 'photo_50', v: '5.62' };
        VK.Api.call('users.get', optionsApi, (data) => {
          this.props.onLogin(data.response[0]);
        });
      }
    }, '5.62');
  };

  render() {
    return (
      <div>
        <button
          className={styles.vkButton}
          onClick={this.handleLoginClick}
        >
          <SvgIcon glyph={VkIcon} size={35} />
        </button>
      </div>
    );
  }
}

