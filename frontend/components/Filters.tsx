import React, { forwardRef } from "react";
import { Text, View } from "react-native";

const Filters = forwardRef((_, ref) => {

    console.log("TESTE")

    return(
        <>
            <View>
                <Text>Filtros</Text>
            </View>
        </>
    )
})

export default Filters;