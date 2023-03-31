import { createBrowserHistory } from 'history'
import { Router, Switch } from 'react-router-dom'
import Loading from './components/Loading/Loading';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import Films from './pages/Admin/Films/Films';
import ShowTime from './pages/Admin/ShowTime/ShowTime';
import AddUser from './pages/Admin/Users/AddUser/AddUser';
import EditUser from './pages/Admin/Users/EditUser/EditUser';
import Users from './pages/Admin/Users/Users';
import Checkout from './pages/Checkout/Checkout';
import Contact from './pages/Contact/Contact';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import News from './pages/News/News';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import { CheckoutTemplate } from './templates/CheckoutTemplate/CheckoutTemplate'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemPlate';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';



export const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Loading/>
            <Switch>

                <HomeTemplate path='/home' exact Component={Home} />
                <HomeTemplate path='/contact' exact Component={Contact} />
                <HomeTemplate path='/news' exact Component={News} />
                <HomeTemplate path='/detail/:id' exact Component={Detail} />
                <HomeTemplate path='/profile' exact Component={Profile} />
                
                <UserTemplate path='/login' exact Component={Login} />
                <UserTemplate path='/register' exact Component={Register} />

                <AdminTemplate path="/admin" exact Component={Dashboard} />
                <AdminTemplate path ='/admin/users' exact Component={Users}/>
                <AdminTemplate path ='/admin/users/adduser' exact Component={AddUser}/>
                <AdminTemplate path ='/admin/users/edituser' exact Component={EditUser}/>
                <AdminTemplate path ='/admin/films' exact Component={Films}/>
                <AdminTemplate path ='/admin/films/addnew' exact Component={AddNew}/>
                <AdminTemplate path ='/admin/films/edit/:id' exact Component={Edit}/>
                <AdminTemplate path ='/admin/films/showtime/:id/:tenphim' exact Component={ShowTime}/>

                <AdminTemplate path="/admin/users" exact Component={Dashboard} />

                <CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />

                <HomeTemplate path='/' exact Component={Home} />

            </Switch>

        </Router>
    );
}

export default App;
