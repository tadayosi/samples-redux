import { RouteComponentProps } from "react-router-dom"
import { AppThunkDispatch } from '../reducer'

export type AppProps = {
  dispatch: AppThunkDispatch
}

type AppRouteProps<T> = AppProps & RouteComponentProps<T>

export default AppRouteProps
