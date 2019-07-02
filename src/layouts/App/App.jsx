import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { withTranslation } from 'react-i18next'
import configureStore from '../../store/store'
import AppoloProvider from './AppoloProvider'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const Loader = () => (
	<div className="App">
		<img src={'https://i.pinimg.com/originals/f9/56/88/f95688dd1ac02f459fe016d141a67bd2.gif'} className="App-logo" alt="logo" />
		<div>loading...</div>
	</div>
)

const Container = () => <AppoloProvider />

const Wrapper = withTranslation()(Container)

const App = () => (
	<Suspense fallback={<Loader />}>
		<Provider store={configureStore()}>
			<Wrapper />
		</Provider>
	</Suspense>
)

export default App