import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const Faq = () => {
  const accordianData = [
    {
      title: "Is there a free trial available?",
      content:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      title: "Can I change my plan later?",
      content:
        "Yes, you can upgrade or downgrade your plan at any time. If you choose to upgrade, you’ll pay a pro-rated amount for the rest of the month. If you choose to downgrade, you’ll be credited on the next invoice.",
    },
    {
      title: "What is your cancellation policy?",
      content:
        "You can cancel your subscription at any time. You’ll continue to have access to your account until the end of your current billing period.",
    },
    {
      title: "Can other info be added to an invoice?",
      content:
        "Yes, you can add any custom information to an invoice, including your business name, address, and logo.",
    },
    {
      title: "How does billing work?",
      content:
        "You can pay for your subscription with any major credit card. We’ll automatically charge you every month or year, depending on your plan.",
    },
    {
      title: "How do I change my account email?",
      content: "You can change your account email by contacting us.",
    },
  ];
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <p className="text-center text-pink">Frequently asked questions</p>
        <h2 className="text-center font-medium my-4">
          Everything you need to know.
        </h2>
      </div>
      <div className="my-10">
        {accordianData.map((item, index) => (
          <>
            <div key={index} className="my-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => {
                  if (active === index) setActive(-1);
                  else setActive(index);
                }}
              >
                <h4 className="font-medium py-1">{item.title}</h4>
                <span className="text-2xl">
                  {active === index ? (
                    <AiOutlineMinusCircle className="text-pink" />
                  ) : (
                    <AiOutlinePlusCircle className="text-pink" />
                  )}
                </span>
              </div>
              <p
                className={`${
                  active === index ? "h-16" : "h-0"
                } overflow-hidden`}
                style={{
                  transition: "height ease-in-out 0.5s",
                }}
              >
                {item.content}
              </p>
            </div>
            {index !== accordianData.length - 1 && (
              <hr className="my-4" key={index} />
            )}
          </>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <img src="/assets/avatar-grp.png" alt="avatar" />
        <div className="my-6">
          <h5 className="text-center text-pink mb-2">Still have questions?</h5>
          <p className="text-center">
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </p>
        </div>
        <Button
          theme="pink"
          size="md-rect"
          onClick={() => {
            navigate("/contact-us");
          }}
        >
          Get in Touch
        </Button>
      </div>
    </div>
  );
};

export default Faq;
