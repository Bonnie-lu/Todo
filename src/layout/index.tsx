import * as React from "react";
// import { Link } from "react-router-dom"
class Layout extends React.Component<any>{
    render(){
        return(
            <div className="layout">
                公共页面Layout
                <div>{this.props.children}</div>
                {/* <div>
                    <Link to="/list">Todo</Link>
                    <Link to="/hello">Hello</Link>
                </div> */}
                
            </div>
        )
    }
}
export default Layout;