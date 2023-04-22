import React from 'react';
import clasees from './RulesPage.module.css';
import { Link } from 'react-router-dom';


interface RulesPageProps {

}

function RulesPage(props: RulesPageProps) {
    return (
        <div className={ clasees.RulesPage }>

            <div className={ clasees.Content }>

                {/* I */ }
                <div className={ clasees.Paragraph }>
                    <div className={ clasees.Header }>
                        <p>I. Tasks</p>
                    </div>
                    <div className={ clasees.Points }>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>1.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>One task — one photo</p>
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>2.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>Do the tasks thoughtfully, but make decisions quickly</p>
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>3.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>You don't have to do all of them at once</p>
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>4.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>If you feel internal changes, revise your list of things, replace the irrelevant</p>
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>5.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>Archive things to research yourself through time (remember <Link to={ '/manifesto' }><span
                                    style={ { fontStyle: 'italic', textDecoration: 'underline' } }>the tenth rule</span></Link>)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* II */ }
                <div className={ clasees.Paragraph }>
                    <div className={ clasees.Header }>
                        <p>II. Photography</p>
                    </div>
                    <div className={ clasees.Points }>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>1.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <img
                                    style={ {
                                        maxWidth: '180px',
                                        maxHeight: '32px'
                                    } }
                                    draggable={ false }
                                    alt={ '???' }
                                    src={ require('./imgs/II-1.png') }
                                />
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>2.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p style={ { marginBottom: '11px' } }>If the task is to capture one thing, it must be
                                    clearly visible in the frame so that
                                    it
                                    can be identified (i). There must be no other objects in the frame, the background
                                    must
                                    be solid or the object may be cut out from the background and uploaded as a .png
                                    (ii).
                                    There can be hands in the frame (iii). It is best to photograph the thing from the
                                    front.</p>
                                <img
                                    draggable={ false }
                                    alt={ '???' }
                                    src={ require('./imgs/II-2.png') }
                                />
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>3.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p style={ { marginBottom: '11px' } }>If the task allows you to choose several things,
                                    put them in the same frame, make a
                                    composition (iv).</p>
                                <img
                                    style={ {
                                        maxWidth: '177px',
                                        maxHeight: '200px'
                                    } }
                                    draggable={ false }
                                    alt={ '???' }
                                    src={ require('./imgs/II-3.png') }
                                />
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>4.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>If you are photographing a place, don't try to make it perfect or put everything in
                                    order. Remember <Link to={ '/manifesto' }><span
                                        style={ {
                                            fontStyle: 'italic',
                                            textDecoration: 'underline'
                                        } }>the first rule</span></Link>.</p>
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>5.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>Things you are photographing should be well lit with natural light or you can use a
                                    flash.</p>
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>6.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>Forget the rules and do as you like.</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* III */ }
                <div className={ clasees.Paragraph }>
                    <div className={ clasees.Header }>
                        <p>III. Questions</p>
                    </div>
                    <div className={ clasees.Points }>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>1.</p>
                            </div>
                            <div className={ clasees.PointContent }>
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
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>2.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>Answer the questions honestly</p>
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>3.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>You can change the answer to a question by entering the task editor</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* IV */ }
                <div className={ clasees.Paragraph }>
                    <div className={ clasees.Header }>
                        <p>IV. Collections</p>
                    </div>
                    <div className={ clasees.Points }>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>1.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>Observe other people's everyday life in their profiles (remember <Link
                                    to={ '/manifesto' }><span
                                    style={ {
                                        fontStyle: 'italic',
                                        textDecoration: 'underline'
                                    } }>the sixth rule</span></Link>)</p>
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>2.</p>
                            </div>
                            <div className={ clasees.PointContent }>
                                <p>Collect things from other users into your themed collections</p>
                            </div>
                        </div>
                        <div className={ clasees.Point }>
                            <div className={ clasees.Number }>
                                <p>3.</p>
                            </div>
                            <div className={ clasees.PointContent }>
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