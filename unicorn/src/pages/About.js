import Titi from '../assets/Tilly-Tilly.jpeg'
const About = () => {
  return (
    <div className="abouttext">
      <h1 className="aboutheader">About Unicorn</h1>
      <h4 className="vision-quote">
        "...but what is grief, if not love persevering?" - Vision(WandaVision,
        2021)
      </h4>
      <img className="tilly-tilly" src={Titi} alt="Unicorn-Princess" />
      <div className="about-pretext">
        <p>
          I know what it feels to lose someone so close to you. Like all of you
          here, I lost my friend, Titi in November of 2020. She was my first
          best friend, my unicorn princess and really my soul sister for the 11
          years that we were blessed to be a part of each other's lives.
          Everyone remembers the exact moment they found out their loved one was
          gone, and then what follow is an absolute blur. A darkness that is
          indescribable and a feeling of hollow, aloneness, numbness, pain,
          rage, sadness. A cocktail of emotions if you may, but one thing is for
          certain, in that exact moment, we became changed forever. Like a part
          of yourself, and your innocence, and your joy, has forever been dented
          by this one particular incident.
        </p>

        <p>
          I still remember when my friend Ellen got us all on a group call that
          fateful day in November. I was still trying to make jokes on the phone
          when she blurted out the words "...so Titi died today...". That was
          all I heard and that was all I remember. I don't know what happened
          after, but I know I grabbed my keys and just started driving. I ended
          up at a friend's house and just got there and wept bitterly. Everyone
          deals very differently with grief, and it's very common to feel like
          you're alone and nobody understands you or what you're dealing with.{' '}
        </p>

        <p>
          But in my darkest moments, I saw light. I have a clique of friends,
          who like Titi, we became friends around the same time. We were all
          classmates in college, and from there we had formed a bond - like a
          sisterhood. We loved fully and we loved deeply. And so when we lost
          Titi, we grieved fully and we grieved deeply. And we grieved together.
          I have no idea how I would have survived that period without them, and
          while it doesn't get any easier, having people who truly understand
          what you are going through, can relate to your pain, and can feel your
          loss with you, makes all of the difference. That was so important for
          me to have, and so I decided to pour out my heart and create
          <span className="unicorn-tag-about"> Unicorn</span>. I want to give
          the gift of community to people who are going through or have gone
          through what I went through. I want to create a space for people to
          have what my sisters were to me, in the darkest times of my life. I am
          holding your hands through this process. Please don't shut down. Heal.
          My hope is that in using Unicorn, you help others heal and in doing
          so, you heal yourself too. I love you all.{' '}
        </p>

        <p>Love, Wendy</p>
      </div>
      <div className="linkedin">
        <p>
          This is a model of the community I built during my software
          engineering immersive program at General assembly.
        </p>
        <p>
          Connect with me on{' '}
          <span>
            <a href="https://www.linkedin.com/in/chinwenduukoha/">Linkedin!</a>
          </span>
        </p>
      </div>
    </div>
  )
}

export default About
