import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const styles = {
    container: `w-full p-[30px] h-full flex items-center justify-center`,
    body: `flex flex-col justify-center max-w-[700px] text-[#fff] gap-4 mb-[50px]`
}

const terms = () => {
  return (
    <div>
        <Navbar />
        <div className={styles.container}>
            <div className={styles.body}>
                <h1 className='text-[26px] mb-2'> TERMS &amp; CONDITIONS </h1>
                <h3 className='text-[16px] mb-5'>Last updated 4 September, 2022</h3>
                <h2 className='text-[19px] mb-4'> INTRODUCTION</h2>
                <p >
                    These are the terms and conditions governing the use of
                    https://duarequest.app, (the Website) and the agreement that operates
                    between us and you (the Terms). The Website is owned and operated by
                    DuaRequest &nbsp;(us/our/we) and these Terms set out the rights and
                    obligations of all users (you/your) in relation to your use of the
                    Website.
                </p>
                <p>
                    Please read carefully these Terms and our Privacy Statement. By using the
                    Website, you are consenting to be bound by the current Terms and our
                    Privacy Statement. We may revise the Terms and information contained on
                    the Website at any time and without notice. If you do not agree to these
                    Terms or the Privacy Statement, please refrain from using the Website.
                </p>
                <p>
                    If you have any questions about the Terms or the Privacy Statement, please
                    contact us through mail at{" "}
                    support@duarequest.app.
                </p>
                <h2 className='text-[19px] mb-4'>CONDUCT OF USE</h2>
                <p>
                    You are not allowed to use this website in any way that is unlawful,
                    abusive, threatening, harassing, obscene, libelous, hateful, or in any
                    other way violating these terms and conditions.
                </p>
                <h2 className='text-[19px] mb-4'>LIABILITY</h2>
                <p>
                    The material contained within the Website is provided without any
                    guarantees, conditions or warranties as to its accuracy. DuaRequest does
                    not represent that information contained on or available via the Website
                    is accurate or complete and accordingly, it should not be relied on as
                    such. You should not rely on any such information. Any arrangements made
                    between you and any other person, using or named on the Website are
                    entirely at your sole risk and responsibility.
                </p>
                <p>
                    To the extent permitted by law, we, and third parties connected to us
                    hereby expressly exclude:
                </p>
                <p>
                    all conditions, warranties and other terms which might otherwise be
                    implied by statute, common law or the law of equity;
                </p>
                <p>
                    any liability for loss or damage incurred by any user in connection with
                    the use, inability to use, or results of the use of the Website, any
                    websites linked to it and any material posted on it;
                </p>
                <p>   any liability for any bugs or faults in our systems or tools; and  </p>
                <p>
                    any liability for any direct, special, indirect or consequential loss or
                    damage incurred by any user in connection with the Website or in
                    connection with the use, inability to use, or results of the use of the
                    Website, any websites linked to it and any materials posted on it,
                    including, without limitation any liability for:
                </p>
                <li className='ml-4 '>       loss of income or revenue;   </li>
                <li className='ml-4 '>        loss of business;     </li>
                <li className='ml-4 '>     loss of profits or contracts;        </li>
                <li className='ml-4 '>     loss of data        </li>
                
                <li className='ml-4 '>loss of goodwill; </li>
                <li className='ml-4 '> wasted management or office time; and   </li>
                <li className='ml-4 '> for any other loss or damage of any kind, however arising and whether caused by tort (including negligence), breach of contract or otherwise, even if foreseeable.  </li>
                <p>
                    Nothing in this section affects our liability for death or personal injury
                    arising from our negligence, nor our liability for fraudulent
                    misrepresentation or misrepresentation as to a fundamental matter, nor any
                    other liability which cannot be excluded or limited under applicable
                    law.&nbsp;
                </p>
                <h2 className='text-[19px] mb-4'> LIMITS OF USE        </h2>
                <p> You may use our Website only for lawful purposes. You may not use our Website:</p>
                
                <li className='ml-4 '>In any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect;</li>
                <li className='ml-4 '>To send, knowingly receive, upload, download, use or re-use any material which does not comply with our content </li>
                <li className='ml-4 '>To transmit any data, send or upload any material that contains viruses, trojan horses, worms, time-bombs, keystroke loggers, spyware, adware or any other harmful programs or similar computer code designed to adversely affect the operation of any computer software or hardware</li>

                
                <h3> You also agree: </h3>
                <li className='ml-4 '>Not to reproduce, duplicate, copy or re-sell any part of our website in contravention of the provisions of these Terms;    </li>
                <li className='ml-4 '>Not to use ad-blocking software</li>
                <li className='ml-4 '>Not to reuse text or graphics from the Website or parts thereof.</li>
                <h2 className='text-[19px] mb-4'> CHANGES TO TERMS </h2>
                <p>
                    We are committed to ensuring that our website is as useful and efficient
                    as possible. For that reason, we reserve the right to make changes to the
                    services, at any time. We will never charge you for any service without
                    making it very clear to you precisely what you`&apos;`re paying for.
                </p>
                <p>
                    Any new features which are added to the current site shall also be subject
                    to this Terms and Conditions. You can always review the most current
                    version of the Terms and conditions at any time on this page. We reserve
                    the right to update, change or retrieve any part of these Terms and
                    conditions by posting updates and/or changes to our website. It is your
                    responsibility to check this page periodically for changes. Your continued
                    use of or access to the website following the posting of any changes
                    constitutes acceptance of those changes.
                </p>
                <h2 className='text-[19px] mb-4'> SERVICE TERMS   </h2>
                <li className='ml-4 '>DuaRequest at this moment grants the User a non-exclusive, non-transferable, limited right to access and use the Service, under the conditions of these Terms and Conditions and for the duration of the Agreement.</li>
                <li className='ml-4 '>The use of the Service is at the User`&apos;`s own expense and risk. The User is responsible for meeting the technical and functional requirements and using the electronic communication facilities that are necessary to be able to access and use the Service. The User will at all times bear the risk of loss, theft or damage to any of its data. </li>
                <li className='ml-4 '>DuaRequest will have the right (but not the obligation), at its sole discretion, to review, edit, limit, refuse or remove Content, or to limit or refuse the User access to the Service. More specifically in the event the use of the Service, according to us, violates these Terms of Use.</li>
                <li className='ml-4 '>We may disclose the User`&apos;`s Personal Data or Content, or other data relating to the use of the Service, to third parties where it believes, in good faith, that it is necessary to comply with a court order, ongoing judicial proceeding, criminal or civil subpoena, or other legal process or to exercise its constitutional rights of defense against legal claims.</li>
                
                <h2 className='text-[19px] mb-4'> PERSONAL INFORMATION</h2>
                <p>
                    Your submission of personal information through the store is regulated by
                    our Privacy Policy. You are to view our Privacy Policy.
                    &nbsp;
                </p>
                <h2 className='text-[19px] mb-4'> USER CONDUCT </h2>
                <p>
                    All Visual Content posted or otherwise submitted to the Site, and any
                    comments, or other communications (“Communications”, with Visual Content
                    and Communications collectively referred to as “Content”) is the sole
                    responsibility of the account holder from which such Communications
                    originate. You acknowledge and agree that you, and not DuaRequest, are
                    entirely responsible for all Content that you post, or otherwise submit to
                    the Site. DuaRequest does not control user submitted Content and, as such,
                    does not guarantee the accuracy, integrity, or quality of such Content.
                    You understand that by using the Site, you may be exposed to Content that
                    is offensive, indecent, or objectionable.
                </p>
                <p>
                    As a condition of use, you promise to abide by our Content Guidelines and
                    not to use the Services for any purpose that is unlawful or prohibited by
                    these Terms, or any other purpose not reasonably intended by DuaRequest.
                    By way of example, and not as a limitation, you agree not to use the
                    Services:
                </p>
                <li className='ml-4 '> To abuse, harass, threaten, impersonate, or intimidate any person;
                </li>
                <li className='ml-4 '> To post or transmit, or cause to be posted or transmitted, any Content
                    that is libelous, defamatory, obscene, pornographic, abusive, offensive,
                    profane, or that infringes any copyright or other right of any person;
                </li>
                <li className='ml-4 '>To communicate with DuaRequest representatives or other users in an
                    abusive or offensive manner;
                </li>
                <li className='ml-4 '> For any purpose (including posting or viewing Content) that is not
                    permitted under the laws of the jurisdiction where you use the Services;
                </li>
                <li className='ml-4 '>To post or transmit, or cause to be posted or transmitted, any
                    Communication designed or intended to obtain password, account, or private
                    information from any DuaRequest user;
                </li>
                <li className='ml-4 '> To create or transmit unwanted ‘spam’ to any person or any URL;
                </li>
                <li className='ml-4 '>To create multiple accounts for the purpose of voting for users’ Visual
                    Content;
                </li>
                <li className='ml-4 '> With the exception of accessing RSS feeds, you agree not to use any
                    robot, spider, scraper, or other automated means to access the Site for
                    any purpose without our express written permission. Additionally, you
                    agree that you will not: (i) take any action that imposes, or may impose
                    in our sole discretion an unreasonable or disproportionately large load on
                    our infrastructure; (ii) interfere or attempt to interfere with the proper
                    working of the Site or any activities conducted on the Site; or (iii)
                    bypass any measures we may use to prevent or restrict access to the Site;
                </li>
                <li className='ml-4 '>To advertise to, or solicit, any user to buy or sell any third party
                    products or services, or to use any information obtained from the Services
                    in order to contact, advertise to, solicit, or sell to any user without
                    their prior explicit consent;
                </li>
                <li className='ml-4 '>To promote or sell Visual Content of another person unless you are
                    expressly authorized to do so; or
                </li>
                <li className='ml-4 '> To sell, assign, or otherwise transfer your Profile or account.
                </li>
                <p>
                    To report a suspected abuse of the Site or a breach of the Terms (other
                    than relating to copyright infringement which is addressed under
                    “COPYRIGHT COMPLAINTS” below), please send written notice to DuaRequest at
                    email: support@duarequest.app.
                </p>
                <p>
                    If the Services or Site are used in a manner that violates the Terms in
                    any way, DuaRequest may at its sole discretion, but is not required to,
                    suspend or terminate your account, disable your access to the Site and/or
                    take any steps that it deems appropriate to address the situation.
                </p>
                <h2 className='text-[19px] mb-4'> DISCLAIMER OF WARRANTY AND LIMITATION OF LIABILITY </h2>
                <p>
                    YOU HEREBY RELEASE US AND AGREE TO HOLD US HARMLESS FROM ANY AND ALL
                    CAUSES OF ACTION AND CLAIMS OF ANY NATURE RESULTING FROM THE COUNSELOR
                    SERVICES OR THE PLATFORM, INCLUDING (WITHOUT LIMITATION) ANY ACT,
                    OMISSION, OPINION, RESPONSE, ADVICE, SUGGESTION, INFORMATION AND/OR
                    SERVICE OF ANY COUNSELOR AND/OR ANY OTHER CONTENT OR INFORMATION
                    ACCESSIBLE THROUGH THE PLATFORM.
                </p>
                <p>
                    YOU UNDERSTAND, AGREE AND ACKNOWLEDGE THAT THE PLATFORM IS PROVIDED `&quot;`AS
                    IS`&quot;` WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES OF ANY KIND, INCLUDING BUT
                    NOT LIMITED TO MERCHANTABILITY, NON-INFRINGEMENT, SECURITY, FITNESS FOR A
                    PARTICULAR PURPOSE OR ACCURACY. THE USE OF THE PLATFORM IS AT YOUR OWN
                    RISK. TO THE FULLEST EXTENT OF THE LAW, WE EXPRESSLY DISCLAIM ALL
                    WARRANTIES OF ANY KIND, WHETHER EXPRESSED OR IMPLIED.
                </p>
                <p>
                    YOU UNDERSTAND, AGREE AND ACKNOWLEDGE THAT WE SHALL NOT BE LIABLE TO YOU
                    OR TO ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL,
                    SPECIAL, PUNITIVE OR EXEMPLARY DAMAGES.
                </p>
                <p>
                    YOU UNDERSTAND, AGREE AND ACKNOWLEDGE THAT OUR AGGREGATE LIABILITY FOR
                    DAMAGES ARISING WITH RESPECT TO THIS AGREEMENT AND ANY AND ALL USE OF THE
                    PLATFORM WILL NOT EXCEED THE TOTAL AMOUNT OF MONEY PAID BY YOU OR ON YOUR
                    BEHALF THROUGH THE PLATFORM IN THE 12 MONTHS PERIOD PRIOR TO THE DATE OF
                    THE CLAIM.
                </p>
                <p>
                    If the applicable law does not allow the limitation of liability as set
                    forth above, the limitation will be deemed modified solely to the extent
                    necessary to comply with applicable law.
                </p>
                <p>
                    This section (limitation of liability) shall survive the termination or
                    expiration of this Agreement.
                </p>
                <h2 className='text-[19px] mb-4'> IFRAMES  </h2>
                <p>
                    Without prior approval and written permission, you may not create frames
                    around our Webpages that alter in any way the visual presentation or
                    appearance of our Website.
                </p>
                <h2 className='text-[19px] mb-4'>INDEMNIFICATION </h2>
                <p>
                    You agree to indemnify, protect and hold harmless to DuaRequest,
                    subsidiaries, affiliates, partners, officers, directors, agents,
                    contractors, license, service providers, subcontractors, suppliers,
                    interns and employees, harmless from any claim or demand, including
                    reasonable attorney’s fees, made by any third party due to or arising out
                    of your breach of these Terms and conditions or the documents they
                    incorporate by reference or your infringement of any law or the rights of
                    a third-party.
                </p>
                <h2 className='text-[19px] mb-4'>SEVERABILITY</h2>
                <p>
                    In the event that any provision of these Terms and conditions is
                    discovered to be unlawful, null or unenforceable, such provision shall
                    notwithstanding be enforceable to the fullest extent permitted by
                    applicable law, and the unenforceable portion shall be viewed to be cut
                    off from these Terms of Use, such determination shall not affect the
                    credibility and enforceability of any other remaining provisions.
                </p>
                <h2 className='text-[19px] mb-4'>ENTIRE AGREEMENT</h2>
                <p>
                    Our inability to exercise or enforce any right or provision of these Terms
                    of Service shall not constitute a discharge of such right or provision.
                </p>
                <p>
                    These Terms of Use and any policies or operating rules posted by us on
                    this website or in respect to the Service constitutes the entire agreement
                    and understanding between you and us and govern your use of the Service,
                    pre-empt any prior or synchronous agreements, communications and
                    proposals, whether oral or written, between you and us.
                </p>
                <p>
                    Any ambiguities in the interpretation of these Terms of Use shall not be
                    construed against the drafting party.
                </p>
                <h2 className='text-[19px] mb-4'>CONTACT INFORMATION </h2>
                <p>
                    If you would like to: access, correct, register a complaint, or simply
                    want more information please contact us:
                </p>
                <p>DuaRequest</p>
                <p>support@duarequest.app</p>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default terms