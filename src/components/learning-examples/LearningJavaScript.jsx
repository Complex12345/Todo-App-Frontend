const person = {
    name: "Complex",

    address: {
        city: "London",
        country: "UK"
    },
    age: 25,

    profiles: ['twitter', 'facebook', 'instagram'],

    printProfile: () => {
        person.profiles.map(
            profile => console.log(profile)
        )

        console.log(person.profiles[0]);
    }


}


export default function LearningJavaScript() {
    return (
        <>
            <div>
                {person.name}
            </div>
            <div>
                {person.age}
            </div>
            <div>
                {person.address.city}
            </div>
            <div>
                {person.printProfile()}
            </div>
        </>

    )
}