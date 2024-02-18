import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { isValidate } from '../slices/userSlice'
import { PropTypes } from 'prop-types'

const PrivateRoute = ({ redirectPath = "/signin" }) => {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isAuth, setAuth] = useState(false)

    useEffect(() => {
        dispatch(isValidate())
            .then((result) => {
                if (result.payload) {
                    setAuth(true)
                }
                else {
                    setAuth(false)
                    navigate(redirectPath)
                }
            })
            .catch(() => {
                navigate(redirectPath)
            })
    }, [location.pathname])

    return (
        <>{isAuth && <Outlet />}</>
    )
}

PrivateRoute.propTypes = {
    redirectPath: PropTypes.string,
}

export default PrivateRoute