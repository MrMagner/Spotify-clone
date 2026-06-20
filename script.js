console.log("lets write javascript")

async function getSongs(){
    let a = await fetch ("http://127.0.0.1:3000/songs/")
    let response=await a.text()
    let div = document.createElement("div")
    div.innerHTML=response;
    let as = div.getElementsByTagName("a")
    let songs=[]

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")){
            songs.push(element.href.split("/%5Csongs%5C")[1])
        }
    }
    return songs

}
async function main(){

    let songs= await getSongs()
    console.log(songs)

    let songUl=document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUl.innerHTML=songUl.innerHTML+`<li> ${song.replaceAll("%20"," ")} </li>`
    }

    var audio=new Audio(songs[0])
    // audio.play()

    audio.addEventListener("loadeddata",()=>{
        let duration=audio.duration
        console.log(duration)
    })
}
main()