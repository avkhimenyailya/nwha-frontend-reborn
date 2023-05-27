import React from 'react';
import classes from './RulesPage.module.scss';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../../../store/store';


interface RulesPageProps {

}

function RulesPage(props: RulesPageProps) {
    const theme = useAppSelector(state => state.themeSlice.theme);

    return (
        <div className={classes.RulesPage}>

            <div className={classes.Content}>

                {/* I */}
                <div className={classes.Paragraph}>
                    <div className={classes.Header}>
                        <p>I. Tasks</p>
                    </div>
                    <div className={classes.Points}>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>1.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>One task — one photo</p>
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>2.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>Do the tasks thoughtfully, but make decisions quickly</p>
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>3.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>You don't have to do all of them at once</p>
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>4.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>If you feel internal changes, revise your list of things, replace the irrelevant</p>
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>5.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>Archive things to research yourself through time (remember <Link
                                    to={'/manifesto'}><span
                                    className="link">the tenth rule</span></Link>)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* II */}
                <div className={classes.Paragraph}>
                    <div className={classes.Header}>
                        <p>II. Photography</p>
                    </div>
                    <div className={classes.Points}>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>1.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <img
                                    style={{
                                        maxWidth: '268px',
                                        maxHeight: '32px'
                                    }}
                                    draggable={false}
                                    alt={'???'}
                                    src={require(`./imgs/II-1.${theme}.png`)}
                                />
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>2.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p style={{marginBottom: '11px'}}>If the task is to capture one thing, it must be
                                    clearly visible in the frame so that
                                    it
                                    can be identified (i). There must be no other objects in the frame, the background
                                    must
                                    be solid or the object may be cut out from the background and uploaded as a .png
                                    (ii).
                                    There can be hands in the frame (iii). It is best to photograph the thing from the
                                    front.</p>
                                <img
                                    draggable={false}
                                    alt={'???'}
                                    src={require(`./imgs/II-2.${theme}.png`)}
                                />
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>3.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p style={{marginBottom: '11px'}}>If the task allows you to choose several things,
                                    put them in the same frame, make a
                                    composition (iv).</p>
                                <img
                                    style={{
                                        maxWidth: '177px',
                                        maxHeight: '200px'
                                    }}
                                    draggable={false}
                                    alt={'???'}
                                    src={require(`./imgs/II-3.${theme}.png`)}
                                />
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>4.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>If you are photographing a place, don't try to make it perfect or put everything in
                                    order. Remember <Link to={'/manifesto'}><span
                                        className="link">the first rule</span></Link>.</p>
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>5.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>Things you are photographing should be well lit with natural light or you can use a
                                    flash.</p>
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>6.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>Forget the rules and do as you like.</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* III */}
                <div className={classes.Paragraph}>
                    <div className={classes.Header}>
                        <p>III. Questions</p>
                    </div>
                    <div className={classes.Points}>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>1.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>Questions are necessary to explore your everyday life not only visually, but also
                                    theoretically. After you have taken the entry test, you will be assigned qualities
                                    that
                                    can characterise you as a person. Remember that the entry test will not give you a
                                    complete result. For each task you will be asked to answer one more question. This
                                    way
                                    you will be given more details about your characteristics as you complete your
                                    profile.</p>
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>2.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>Answer the questions honestly</p>
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>3.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>You can change the answer to a question by entering the task editor</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* IV */}
                <div className={classes.Paragraph}>
                    <div className={classes.Header}>
                        <p>IV. Collections</p>
                    </div>
                    <div className={classes.Points}>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>1.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>Observe other people's everyday life in their profiles (remember <Link
                                    to={'/manifesto'}><span
                                    className="link">the sixth rule</span></Link>)</p>
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>2.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>Collect things from other users into your themed collections</p>
                            </div>
                        </div>
                        <div className={classes.Point}>
                            <div className={classes.Number}>
                                <p>3.</p>
                            </div>
                            <div className={classes.PointContent}>
                                <p>Be prepared for your things to be part of someone else's collection</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RulesPage;