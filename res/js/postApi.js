export class Post{
    constructor(media, text, timestamp){
        this.media = media
        this.text = text
        this.timestamp = timestamp
    }
}

export async function getPosts() {
    return [
        new Post('res/media/video.mp4', 'Guys... is this real? What\'s going on out there???', new Date()),
        new Post(null,'im scared. theyre telling me i cant leave my house?!', new Date()),
        new Post(null,'This is just a hoax, relax everyone', new Date()),
        new Post(null,'is this for real??', new Date()),
        new Post('res/media/room.png','I think I just heard one of those noises they were warning us about', new Date()),
        new Post(null,'I nodded off for a while and I think my brother just disappeared out of our locked room...' , new Date()),
        new Post('res/media/creature.png','deleted', new Date()),
        new Post(null,'where is everyone?' , new Date()),
        new Post(null,'THIS IS NOT A TEST, GET BACK INSIDE AND BOARD EVERYTHING UP AS SOON AS YOU CAN' , new Date()),
        new Post('res/media/motion.gif','something just set off my cameras??' , new Date())
    ]
}
