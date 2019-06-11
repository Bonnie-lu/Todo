import * as React from 'react';

export interface Props {
  name: string 
  enthusiasmLevel?: number
}

// class Hellos extends React.Component<Props,any>{
//     constructor(props:Props){
//         super(props)
//     }
//     render(){
//         const { props } = this
//         return(
//             <>
//             <div className="greeting">
//              Hello {props.name + getExclamationMarks(props.enthusiasmLevel!)}      
//              </div>   
//             </>
//         )
//     }
// }
  
function Hello(props: Props) {
    if (props.enthusiasmLevel! <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }
    return (    
        <div className="hello">
            <div className="greeting">
                Hello {props.name + getExclamationMarks(props.enthusiasmLevel!)}
                
            </div>
        </div>
    );
  }
  
export default Hello;

// helpers
function getExclamationMarks(numChars: number) {
  return numChars && Array(numChars + 1).join('!');
}