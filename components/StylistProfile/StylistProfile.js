import React from 'react'; 
import StarRatings from 'react-star-ratings';
import queryString from 'query-string';


const StylistProfile = (props)=>{

// Edit this to feed in actual default pricing
let defaultPricing = 170;

let CustomTag = `a`

if(!props.link) {
    CustomTag = `div`
}


let numOfReviews = props.numOfReviews;
let reviewString = numOfReviews + " reviews";
let link = props.link;
let buttonStyle = {};
if(numOfReviews === 0){
      reviewString = "new"
}
let errorStyle; //when a stylist is booked out

//checking for unavailable time;
let isUnavailableForTime

if(props.unavailable_dates){
  for(let d of props.unavailable_dates){
    let time;
      if(d.length >10){
        time = d.split("T")[1];
        let unavail_date = d.split("T")[0];
        if(unavail_date === props.event_date && props.event_time <= time ){
          isUnavailableForTime = true;
        }
      }
  }
}
let offerCardClass = `Grid__Cell Grid__Cell--white offer-item`;

if(!props.forLandingPage){
//default, if props.stage === 10
      if(props.stage === 10){
      link = link.replace("view=autoquote", "view=appointmentrequest_submitted");
      }


      //if props.stage === 0
      if(props.stage < 10 || props.unavailable_dates.includes(props.event_date) || isUnavailableForTime){
      CustomTag = `div`
      errorStyle = {color: '#cc0000', fontSize: 17};
      link = "";
      offerCardClass = `Grid__Cell Grid__Cell--white offer-item Card-bookedout`
      }

      if(props.stage === 20 || props.stage === 30){
      CustomTag = `a`
      link = `https://au.flayr.io/products/${props.request_id}`
      }
}else{

}


let reqDriver;
if(props.requests_past_day){

  if(props.requests_past_day.num > 4){
    reqDriver = props.requests_past_day.num + " times";
  }else{
    reqDriver = "Today!"
  }
 
}



return(
<div className={offerCardClass} style={{marginRight: -100}}>
      <div className="ProductItem">
            <div className="ProductItem__Wrapper ">
                  <div className="Grid" data-mobile-count={2} data-desktop-count={4}>
                  <CustomTag  href={link} class="ProductItem__ImageWrapper ">
                        <div class="Grid__Cell Grid__Cell--12 1/3--phone 1/3--tablet-and-up offer-item">
                        <div class="offer-feature-image offer-feature-image-nomargin">

                              <img class="big-profile-pic ProductItem__Image Image--fadeIn Image--lazyLoaded" src={`${props.bigImage}`} className="big-profile-pic ProductItem__Image Image--fadeIn Image--lazyLoaded" alt="#bridal"></img>
                              <span class="Image__Loader"></span>
                      {!props.forLandingPage &&
                              <div class="ProductItem__Info ProductItem__Info--center offer-image-stylist-overlay">
                                    <span>View Photos</span>
                              </div>
                      }
                        </div>
                        </div>

                        <div class="Grid__Cell 2/3--phone 2/3--tablet-and-up offer-item">
                              <div class="Grid Grid__Cell--TopPad5">
                              {/* <span class="Viewprofile__arrow"><i class="material-icons">chevron_right</i></span> */}
                                    <div class="Grid__Cell 1/4--phone hidden-tablet-and-up hidden-lap-and-up offer-stylist-photo">
                                          <img src={`${props.smallImage}`} className="small-profile-pic"></img>
                                    </div>
                                    <div class="Grid__Cell hidden-phone 1/4--tablet-and-up  offer-stylist-photo">
                                          <img src={`${props.smallImage}`} className="small-profile-pic-fixedheight"></img>
                                    </div>
                                    <div class="Grid__Cell 3/4--phone 3/4--tablet-and-up offer-stylist-details">
                                          <span class="ProductItem__Title Heading">{props.firstName}</span>
                                          <small>
                                                <span class="spr-badge" id="spr_badge_10728817548" data-rating="4.75">
                                                <span class="spr-starrating spr-badge-starrating">
                                                <StarRatings
                                                      rating={props.reviewScore}
                                                      starRatedColor="black"
                                                      numberOfStars={5}
                                                      name='rating'
                                                      starDimension="12px"
                                                      starSpacing="2px"
                                                />
                                                </span>
                                                <span class="spr-badge-caption">{reviewString}</span>
                                          </span>
                                          </small>


{props.forLandingPage &&
  <div style={{width: '80%'}}>
  <div class="ProductMeta__Description Rte Offer__PricingCard">
  <div className="ProductItem__PriceList  Heading" style={{overflow: 'hidden', height: '5.5em', position: 'relative'}}>
  <span style={{fontSize: '93%'}} className="ProductItem__Price Price Text--subdued subdued--heading" data-money-convertible>
{props.profile_blurb}
  </span>
  <div className="profile-blurb-text" />
  </div>
  <button style={{marginTop: 20}} className="button-form Button Button--secondary Button--small Button--compressed"  onClick={props.onViewPricingClick}>View Pricing</button>

</div>
</div>
}


{!props.forLandingPage &&
                                          <div class="hidden-phone">
                                                <div class="ProductMeta__Description Rte Offer__PricingCard">
                                                      <span class="ProductMeta__Title Heading u-h3">Total Of ${props.cost}</span>
                                                      <div>
                                                      <p>Book with a deposit of ${props.take}
                                                            <br/>${props.payment} payable on the day<br/>
{/*<span style={{fontSize: '1em'}} class="Alert__Green"><i class="material-icons">check_circle</i>&nbsp;Accepts X% of Requests<br/></span> */}
                                                    { reqDriver && !(props.stage < 10 || props.unavailable_dates.includes(props.event_date) || isUnavailableForTime) &&
                                                      <span style={{fontSize: '1em'}}class="Alert__Stats"><i class="material-icons">whatshot</i>&nbsp;<strong>In Demand</strong><span class="Alert__Stats--cycling"> Requested {reqDriver}</span></span>
                                                    }
                                                      </p>
                                                      </div>
                                                    

                                                </div>
                                                {(!(props.stage < 10 || props.unavailable_dates.includes(props.event_date))&& (props.cost <= props.defaultCost))&&

                                                  <span style={{color: "#008489"}}><i class="material-icons">
                                            local_offer
                                            </i> Great Value</span>
                                                }
                                                {!(props.stage < 10 || props.unavailable_dates.includes(props.event_date) || isUnavailableForTime)&&

                                                <span  class="ViewProfile--rightbottom Button Button--small Button--primary Button--compressed">View Profile</span>
                                                }
                                                  {(props.stage < 10 || props.unavailable_dates.includes(props.event_date) || isUnavailableForTime)&&

                                                <div class="ProductMeta__Title Heading Alert__Booked">Booked Out</div>
                                                  }
                                                

                                          </div>
}
                                    
                                    </div>
                                    {/* pad left */}
{!props.forLandingPage &&
                                     
                                    <div class="hidden-tablet-and-up hidden-lap-and-up">
                                          <div class="ProductMeta__Description Rte Offer__PricingCard ">
                                                <span class="ProductMeta__Title Heading u-h3">Total Of ${props.cost}</span>
                                                <div>
                                                      <p>Book with a deposit of ${props.take}
                                                            <br/>${props.payment} payable on the day<br/>
                               {/*                          <span class="Alert__Green"><i class="material-icons">check_circle</i>&nbsp;Accepts X% of Requests<br/></span>*/}
                                                          {reqDriver && !(props.stage < 10 || props.unavailable_dates.includes(props.event_date))&&
                                                          <span class="Alert__Stats"><i class="material-icons">whatshot</i>&nbsp;<strong>In Demand</strong><br/><span class="Alert__Stats--cycling"> Requested {reqDriver}</span></span>
                                                          }
                                                      </p>
                                                </div>

                                                <div class="Viewprofile__arrow"><i class="material-icons">
                                          chevron_right
                                          </i></div>

                                                {(props.stage < 10 || props.unavailable_dates.includes(props.event_date))&&

                                               <div class="ProductMeta__Title Heading Alert__Booked">Booked Out</div>
                                                 }

                                          </div>
                                          {/* if a stylist is not booked out or declines */}
                                          {(!(props.stage < 10 || props.unavailable_dates.includes(props.event_date))&& (props.cost <= props.defaultCost))&&
                                          // <span class="Viewprofile__arrow"><i class="material-icons">
                                          // chevron_right
                                          // </i></span>

                                            <span class="Label__Great-Value--bottomright"><i class="material-icons">
                                            local_offer
                                            </i> Great Value</span>
                                         
                                          // <span>Great Value</span>
                                          
                                          }
                                          
                                    </div>
}                    
                              </div>
                        </div>


                  </CustomTag>
                  </div>
      </div>

      </div>
</div>
)
}

export default StylistProfile;