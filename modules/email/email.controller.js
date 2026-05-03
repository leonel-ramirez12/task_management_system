import nodemailer from 'nodemailer';
const emailcontroller = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "eabdo6990@gmail.com",
        pass: "jpvfndxaujnnbbhk",
      },
    });
    const info = await transporter.sendMail({
      from: '"hello elbody" <eabdo6990@gmail.com>', 
      to: "abdelrahmanesam017@gmail.com", 
      subject: "Hello",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
    res.json({success: true,messageId: info.messageId,});
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export default emailcontroller;
