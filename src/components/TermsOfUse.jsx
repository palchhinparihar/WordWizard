import React from "react";

const TermsOfUse = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-center">Terms of Use</h1>
      <p className="mb-4">
        Welcome to <span className="font-semibold">WordWizard</span>. By
        accessing or using this website, you agree to comply with and be bound
        by the following terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Use of the Website</h2>
      <p className="mb-4">
        You may use this website for personal and non-commercial purposes only.
        Any misuse or attempt to disrupt the functionality of the site is strictly prohibited.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Intellectual Property</h2>
      <p className="mb-4">
        All content, design, and code within WordWizard are protected by copyright.
        Unauthorized copying or redistribution is prohibited.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Disclaimer</h2>
      <p className="mb-4">
        The information provided on this site is for general purposes only.
        We do not guarantee the accuracy or reliability of any content.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update these terms at any time. Please review
        this page periodically for changes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Contact</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a href="mailto:support@wordwizard.com" className="text-blue-500 underline">
          support@wordwizard.com
        </a>.
      </p>
    </div>
  );
};

export default TermsOfUse;
