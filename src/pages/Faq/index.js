import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const Faq = () => {
  const accordianData = [
    {
      title: "What are packages?",
      content:
        "Packages are groups of bets, carefully chosen by our team at JordansPicks. You can use these to make your own bet slips.",
    },
    {
      title: "When can I see the bets?",
      content:
        "After buying a package, you can see the bets. They will show up in 'Your Account' and on the package page.",
    },
    {
      title: "What if I don't win?",
      content:
        "We promise a 100% profit guarantee. If you don't win, we'll refund your purchase amount to your JordansPicks account. You can use this for buying more packages.",
    },
    {
      title: "How do I pay?",
      content:
        "You can pay for your package with any major credit card. We use Stripe to make sure your payment is safe.",
    },
    {
      title: "What if I paid but didn't get the package?",
      content:
        "If this happens, please contact us. We'll sort it out as soon as we can. It would be helpful if you could send us the URL you were sent to after payment.",
    },
    {
      title: "How can I change my email address?",
      content:
        "To change your email, please get in touch with us. We'll check your identity and then update your email address.",
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
                  active === index
                    ? "h-24 sm:h-20 md:h-16 lg:h-12 xl:h-8"
                    : "h-0"
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
