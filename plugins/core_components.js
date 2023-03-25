import Vue from 'vue';

import PopUp from '@/components/Notifications/PopUp';
import Tooltip from '@/components/Notifications/Tooltip';
import TabLeft from '@/components/Layouts/TabLeft';
import Header from '@/components/Layouts/Header';
import SelectBox from '@/components/SelectBox/SelectBox';
import Notification from '@/components/Notifications/Notification';
import CreateAsset from '@/components/Asset/CreateAsset';

Vue.component('PopUp', PopUp);
Vue.component('Tooltip', Tooltip);
Vue.component('TabLeft', TabLeft);
Vue.component('Header', Header);
Vue.component('SelectBox', SelectBox);
Vue.component('Notification', Notification);
Vue.component('CreateAsset', CreateAsset);