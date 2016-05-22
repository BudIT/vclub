import React from 'react';
import createCommandExecutor from './createCommandExecutor';


export default function cmdProvider(Wrapped) {
  return class CmdInjector extends React.Component {

    static contextTypes = {
      store: React.PropTypes.object,
    };

    static propTypes = {
      store: React.PropTypes.object,
    };

    constructor(props, context) {
      super(props, context);

      const store = props.store || context.store;

      this.state = {
        cmd: createCommandExecutor(store),
      };
    }

    render() {
      return <Wrapped {...this.props} cmd={this.state.cmd} />;
    }
  };
}
