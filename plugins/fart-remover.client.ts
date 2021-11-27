import isDarkModeCookie from '~/helpers/isDarkModeCookie'

export default function (context: any, inject: any) {
  inject('isDarkMode', isDarkModeCookie())
}
