import React, { Fragment } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AddItem from './AddItem';
import List from './List';
import Splash from './Splash';


const SwitchNavigator = createSwitchNavigator(
  {
    Additem:AddItem,
    List:List,
    Splash:Splash
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none'
  }
)

const App = createAppContainer(SwitchNavigator);
export default App

































// import React, { Component } from 'react';
// import { View } from 'react-native';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';

// export default class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
 
//       user_name: '',
//       avatar_url: '',
//       avatar_show: false
//     }
//   }
//   render() {
//     return (
//       <View>
//         <LoginButton
//           onLoginFinished={
//             (error, result) => {
//               if (error) {
//                 console.log("login has error: " + result.error);
//               } else if (result.isCancelled) {
//                 console.log("login is cancelled.");
//               } else {
//                 AccessToken.getCurrentAccessToken().then(
//                   (data) => {
//                     console.log(data.accessToken.toString())
//                   }
//                 )
//               }
//             }
//           }
//           onLogoutFinished={() => console.log("logout.")}/>
//       </View>
//     );
//   }
// };