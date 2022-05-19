import Header from "../../main/components/Header"
import useGetUser from "../../main/hooks/useGetUser"
import './profile.css'



const Profile = () => {

    const user = useGetUser()

    return (
        <main className="body__main">
            <Header />
            <div className="sidebar">
                <div className="sidebar__top">
                    <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080" alt="" />
                    <i className="material-icons sidebar__topAvatar"><img className='user_avatar' src={user.avatar} alt="img" /> </i>
                    <h2>{user.userName}</h2>
                    <h4>{user.email}</h4>
                </div>

                <div className="sidebar__stats">
                    <div className="sidebar__stat">
                        <p>{user.bio}</p>
                    </div>
                    <div className="sidebar__stat">
                        <p>phone Number</p>
                        <p className="sidebar__statNumber">{user.phone}</p>
                    </div>
                </div>

                <div className="sidebar__bottom">
                    <p>{user.phone}</p>
                    <ul className="Education_container">


                        <li><div><h3>appointmets</h3>
                            <h4>appointmets</h4>
                            <span>appointmets</span><span>appointmets</span></div></li>

                    </ul>
                </div>
            </div>
        </main>
    )
}

export default Profile