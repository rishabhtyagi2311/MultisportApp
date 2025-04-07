import "../global.css"
import { Slot } from 'expo-router';
import { RecoilRoot } from 'recoil';


export default function Layout() {
  console.log("🚀 RootLayout is rendering with RecoilRoot")
  return (
 
    <RecoilRoot>
        
       
        <Slot/>
        
  
    </RecoilRoot>
  );
}
