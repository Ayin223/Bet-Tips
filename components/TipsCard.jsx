import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import DataFeed from './DataFeed' // <--- REMOVE THIS, data will come from props

const TipsCard = ({ tip }) => { // <--- Accept 'tip' as a prop
   
  // Optional: Add a check if tip is null or undefined for safety
  if (!tip) {
    return null; // Or return a placeholder if preferred
  }

  return (
    <View style={styles.container}>
        <View style = {styles.leagueContainer}>
        <Text style= {{fontWeight: "bold", fontSize: 18,}}>{tip.league}</Text> {/* Use tip.league */}
        </View>
        
        <View style = {styles.teamsContainer}>
            <Text style= {[styles.teams, {textAlign: "right"}]}>{tip.homeTeam}</Text> {/* Use tip.homeTeam */}
             <Text style= {{ }}>vs</Text>
            <Text style= {[styles.teams, {textAlign:"left"}]}>{tip.awayTeam}</Text> {/* Use tip.awayTeam */}
        </View>

        <View style = {styles.tipsContainer}>
            <Text style = {[styles.tips,{textAlign: "right",}]}>{tip.prediction}</Text> {/* Use tip.prediction */}
            <Text style= {{}}> @ </Text>
            <Text style= {[styles.tips,{textAlign: "left",}]}>{tip.odds}</Text> {/* Use tip.odds */}
        </View>

        <View style = {styles.dateContainer}>
            <Text style= {styles.date}>{tip.date}</Text> {/* Use tip.date */}
        </View>
    </View>
  )
}

export default TipsCard

// Your styles remain the same
const baseContainer = {
    backgroundColor: "white",
    width: "90%",
    height: "30",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0.5,
};

const styles = StyleSheet.create({
    container:{
        // You might want to adjust width/height to be more dynamic or use flex for better responsiveness
        width: "90%", // Made it 90%
        height: 150,
        marginVertical: 10,
        backgroundColor: "lightgray",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 0, height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    leagueContainer:{
        borderBottomWidth: 1,
        backgroundColor: "lightblue",
        width: "100%",
        height: "30", // Consider using height: 30 or a percentage relative to container height
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ddd",
        borderBottomWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    
    teamsContainer:{
        ...baseContainer,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },

    teams: {
        width: "45%", 
        marginHorizontal: 5,
    },

    tipsContainer:{
        ...baseContainer,
        flexDirection: "row",
    },

    tips:{
        width: "45%",   
        marginHorizontal: 5,
    },

    oddsContainer:baseContainer, // This one is not used in the JSX, might be a leftover.

    dateContainer:{
        ...baseContainer,
        marginBottom: 0,
    },
        
})
