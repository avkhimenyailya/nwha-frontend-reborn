import React from 'react';
import classes from './AboutPage.module.css';

interface AboutPageProps {

}

function AboutPage(props: AboutPageProps) {
    return (
        <div className={ classes.AboutPage }>
            <div className={ classes.Content }>
                <p className={ classes.B } style={ { marginBottom: '12px' } }>I.</p>
                <p className={ classes.B } style={ { marginBottom: '40px' } }><span style={ {
                    fontStyle: 'italic', textDecoration: 'underline'
                } }>nothingtowritehomeabout.space</span> is a space for researching
                    everyday life and routine, the part of us that we used to hide from the eyes of outsiders. Some
                    people may think their everyday life is wrong, others find it boring and unworthy of attention. Our
                    aim is to show that everyday life, which each of us tries to hide from public view, can tell a lot
                    more about a person than the public part he or she shows in physical or virtual space. <span
                        style={ { fontStyle: 'italic' } }>Research your
                        everyday world</span> by completing tasks and answering questions.</p>
                <div style={ { marginBottom: '65px' } } className={ classes.Sub }>
                    <p>
                        The project was created by two enthusiasts. @neudemonia was responsible for the idea and design
                        and @jeveloper for the implementation. It's a project with inspiration and a desire to make the
                        world more human and engaging.<br/>It is more than a social network, it is a virtual space to
                        explore and contemplate
                    </p>
                    <p>
                        your material world. This is not the final form of the project. We have many ideas for
                        development which we will gradually turn into reality. Stay tuned to Github and Instagram to
                        follow the process of creating the project, and feel free to get feedback on Discord. Any ideas
                        for improving the online space are welcome.
                    </p>
                </div>
                <p className={ classes.B } style={ { marginBottom: '40px' } }>
                    Be honest, be inspired by the honesty of others, observe yourself, and remember that no one is
                    perfect, but that's what makes us special.
                </p>
                <p className={ classes.B } style={ { marginBottom: '12px' } }>II.</p>
                <div style={ {
                    width: '792px',
                    height: '415px',
                    marginBottom: '12px',
                    overflow: 'clip',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                } }>
                    <img alt={ '?' } src={ require('./gifka.gif') }/>
                </div>
                <div style={ {
                    display: 'flex',
                    justifyContent: 'space-between'
                } }>
                    <p style={ { marginBottom: '40px' } }>Visual reserach: <span style={ { fontStyle: 'italic' } }>
                    The function of the inside. The other side of things.</span>
                    </p>
                    <a style={ {
                        textDecoration: 'underline'
                    } } className={ classes.Watch } href={ 'https://youtu.be/-YolXtHkLZU' } target={ '_blank' }
                       rel="noreferrer">Watch</a>
                </div>
                <div className={ classes.Sub }>
                    <p>
                        If the public part of our life is the shell that we build around ourselves, everyday life and
                        routine are rather the underside, which we are not used to demonstrating to others. We tend to
                        define the inside as something secondary, formal, unworthy of attention, but is it so
                        insignificant? I was interested in exploring what functions the inside might serve, so I decided
                        to study the inside of everyday things
                    </p>
                    <p>
                        that people face and interact with on a daily basis. I suggested that the underside of things
                        can be much more significant and honest than the outside, and therefore the hidden part of our
                        lives, everyday life, can be much more important than the public side. You can read about my
                        research to find out what conclusions I came to.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;