import { useFonts, MajorMonoDisplay_400Regular } from '@expo-google-fonts/major-mono-display';



function getMajorMonoFont() {

    let [fontsLoaded] = useFonts({
        MajorMonoDisplay_400Regular,
    });

    if (!fontsLoaded){
        return 'Arial'
    }else{
        return 'MajorMonoDisplay_400Regular'
    }

}

export {getMajorMonoFont}