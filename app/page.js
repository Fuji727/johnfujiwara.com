export const metadata = {
  title: 'John Fujiwara - Team-Focused Principal Developer',
  description: 'Team-Focused Principal Developer, C#, ASP.NET, Next.js, React, .NET7 WebAPI, Javascript, CSS, SQL',
}

export default function Home() {
  return (
    <main>
      <h2>Who I am</h2>
      <p>Hello, my name is John Fujiwara and I live in beautiful University Place, a neighborhood of Tacoma in Washington State, USA.</p>
      <p>I&apos;ve been with my current employer for 17 years and have done very well for the company, my coworkers, and my family. But now I&apos;m ready for a work challenge that speaks more to my personal values and gives me more control over my time and work conditions.</p>
      <p>I have a broadly-applicable skillset in web standards and .NET development and an aptitude for understanding and solving problems. I have an ability to find sustainable solutions with real people and their needs in mind.</p>
      <p>Please take a look at this site for an explanation of my specific development strengths, examples of my work, and more about the kind of employer I'm looking for.</p>
      <h2>My general development approach</h2>
      <p>Here's my general approach to development of an MVP:</p>
      <ol>
        <li><em>Completely</em> understand the problem and the solution. This is where deep conversations with anticipated end users and subject matter experts, iterative sketches of ideas, and honest discussions about scope and maintenance workload are absolutely vital. Beginning development before completely understanding the solution is only going to take you further away from a happy outcome.</li>
        <li>Design the application architecture according to application uptime, end user locations, processing delays, etc.</li>
        <li>Nail down the data schema: If you set up the data schema and relationships correctly, you are building on a solid foundation.</li>
        <li>Write the implementations of your business logic by <strong>first</strong> writing your unit tests (TDD). These unit tests will accurately and completely describe the desired behaviors defined by Step #1 and also cover errors and invalid requests. (Follow &ldquo;Right BICEP!&rdquo;)</li>
        <li>Train the other developers! This is often the step where multiple other developers begin writing logic, components and UI elements. If they don&apos;t understand the system design and application organization, they&apos;re going to re-write existing code and put logic in the wrong place, guaranteed.</li>
        <li>Create the RESTful API or GraphQL service on top of your business logic. Your SDETs should now be able to start testing at full speed via Postman at this point.</li>
        <li>Create your UI. Importantly, focus on getting your most-important &ldquo;round trip&rdquo; (i.e. request from UI to API and then render results) working ASAP. Then, iterate and refine with the shortest possible feedback loop with end users.</li>
        <li>While UI work continues (it always takes the longest), add telemetry and monitoring.</li>
        <li>Test and release!</li>
        <li>Refine, iterate, and enhance the application and automate onerous maintenance tasks.</li>
      </ol>
      <h2>W3C Standards Web Development (23 years&apos; experience)</h2>
      <details>
        <summary>W3C Standards Web Development (23 years&apos; experience)</summary>
        <p>I began my career with W3C standards-based web development, focusing on using:</p>
        <ul>
          <li>HTML for declarative semantic meaning</li>
          <li>CSS for styling, adaptability, and simple images/animation</li>
          <li>and finally, behavioral Javascript only when necessary</li>
        </ul>
        <p>This foundation of web fundamentals continues to serve me well all these years later.</p>
      </details>
      <h2>.NET Development with C#, React, and NextJS (18 years&apos; experience)</h2>
      <details>
        <summary>.NET Development with C#, React, and NextJS (18 years&apos; experience)</summary>
        <p>I started with ASP.NET in version 1.1 and still use MVC Views in .NET 8 today.</p>
        <p>I use .NET WebAPI to make RESTful services.</p>
        <p>I use React when highly-interactive components are required.</p>
        <p>I am increasing my experience with NextJS (this website is based on it) and find its server-rendering and predictive caching to be killer features. I&apos;m excited to further my usage of it in professional projects.</p>
      </details>
      <h2>Sitecore WCMS Development (8 years&apos; experience)</h2>
      <details>
        <summary>Sitecore WCMS Development (8 years&apos; experience)</summary>
      </details>
      <h2>Software Development and Problem-Solving (18 years&apos; experience)</h2>
      <details>
        <summary>Software Development and Problem-Solving (18 years&apos; experience)</summary>
        <p>OOP, TDD, Advanced debugging, optimizing systems</p>
        <p>I take my work personally and see problems through to full resolution. I don't wait for someone else to find the answers for me.</p>
        <p></p>
      </details>
      <h2>Team Leader (8 years&apos; experience)</h2>
      <details>
        <summary>Team Leader (8 years&apos; experience)</summary>
        <p>I can fluidly bridge understanding gaps between programmers and non-programmers, including mentoring new developers.</p>
        <p></p>
      </details>
    </main>
  )
}
