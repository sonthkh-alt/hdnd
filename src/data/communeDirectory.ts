export interface CommuneContact {
  district: string;
  commune: string;
  name: string;
  position: string;
  phone: string;
  email: string;
}

export const rawCommuneData = `
UNKNOWN	THƯỜNG TRỰC TỈNH ỦY	Lê Đức Thái	Ủy viên TW Đảng, Bí thư Tỉnh ủy	0913266738	
UNKNOWN	THƯỜNG TRỰC TỈNH ỦY	Nguyễn Hoài Anh	Ủy viên TW Đảng, Phó Bí thư Tỉnh ủy, Chủ tịch UBND tỉnh	0945177199	
UNKNOWN	THƯỜNG TRỰC TỈNH ỦY	Nguyễn Hồng Phong	Ủy viên dự khuyết TW Đảng, Phó Bí thư Thường trực Tỉnh ủy	0912288038	
UNKNOWN	THƯỜNG TRỰC TỈNH ỦY	Trịnh Tuấn Sinh	Phó Bí thư Tỉnh ủy, Chủ tịch UBMTTQ Việt Nam tỉnh	0913293501	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Nguyễn Lợi Đức	Tỉnh ủy viên, Chánh Văn phòng	0943907999	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Lê Văn Chung	Phó Chánh Văn phòng	0985737998	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Mai Viết Luyến	Phó Chánh Văn phòng	0904042428	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Lê Khắc Thắng	Phó Chánh Văn phòng	0914259565	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Nguyễn Bá Hoan	Trưởng Phòng Hành chính - Lưu trữ	0912461346	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Hoàng Đình Quang	Phó Trưởng PhòngHành chính - Lưu trữ	0979810567	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Trịnh Thị Mai Hoa	Phó Trưởng PhòngHành chính - Lưu trữ	0912961189	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Lê Thị Mai Lâm	Phó Trưởng PhòngHành chính - Lưu trữ	0903429408	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Trần Thị Mai Loan	Phó Trưởng PhòngHành chính - Lưu trữ	0985759794	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Nguyễn Thị Kim Dung	Văn thư	0914965567	
UNKNOWN	VĂN PHÒNG TỈNH ỦY	Lê Thị Thùy Linh	Văn thư	0989160169	
UNKNOWN	BAN TỔ CHỨC TỈNH ỦY	Nguyễn Văn Hùng	Ủy viên Ban Thường vụ Tỉnh ủy, Trưởng Ban	0913293953	
UNKNOWN	BAN TỔ CHỨC TỈNH ỦY	Lê Xuân Thu	Tỉnh ủy viên, Phó Trưởng Ban Thường trực	0984675058	
UNKNOWN	BAN TỔ CHỨC TỈNH ỦY	Tạ Hồng Lựu	Tỉnh ủy viên, Phó Trưởng Ban	0913113568	
UNKNOWN	BAN TỔ CHỨC TỈNH ỦY	Phạm Mai Anh	Phó Trưởng Ban	0915244591	
UNKNOWN	BAN TỔ CHỨC TỈNH ỦY	Trần Quốc Huy	Phó Trưởng Ban	0903456018	
UNKNOWN	BAN TỔ CHỨC TỈNH ỦY	Trương Quốc Bảo	Chánh Văn phòng	0946187345	
UNKNOWN	BAN TỔ CHỨC TỈNH ỦY	Nguyễn Thị Vân Anh	Văn thư	0936275638	
UNKNOWN	ỦY BAN KIỂM TRA TỈNH ỦY	Phạm Thị Thanh Thủy	Ủy viên Ban Thường vụ, Chủ nhiệm	0913791367	
UNKNOWN	ỦY BAN KIỂM TRA TỈNH ỦY	Phạm Tiến Dũng	Tỉnh ủy viên, Phó Chủ nhiệm Thường trực	0904259077	
UNKNOWN	ỦY BAN KIỂM TRA TỈNH ỦY	Mạc Tuấn Anh	Phó Chủ nhiệm	0912345985	
UNKNOWN	ỦY BAN KIỂM TRA TỈNH ỦY	Hoàng Mai Tính	Phó Chủ nhiệm	0983533929	
UNKNOWN	ỦY BAN KIỂM TRA TỈNH ỦY	Nguyễn Văn Hiệp	Ủy viên, phụ trách Văn phòng	0915251256	
UNKNOWN	ỦY BAN KIỂM TRA TỈNH ỦY	Nguyễn Thị Huyên	Văn thư	0949836366	
UNKNOWN	BAN TUYÊN GIÁO VÀ DÂN VẬN TỈNH ỦY	Đào Xuân Yên	Ủy viên Ban Thường vụ, Trưởng Ban	0982767298	
UNKNOWN	BAN TUYÊN GIÁO VÀ DÂN VẬN TỈNH ỦY	Phạm Trọng Dũng	Phó Trưởng Ban Thường trực	0982424245	
UNKNOWN	BAN TUYÊN GIÁO VÀ DÂN VẬN TỈNH ỦY	Phạm Văn Tuấn	Phó Trưởng Ban	0912240033	
UNKNOWN	BAN TUYÊN GIÁO VÀ DÂN VẬN TỈNH ỦY	Nguyễn Văn Bình	Phó Trưởng Ban	0919014570	
UNKNOWN	BAN TUYÊN GIÁO VÀ DÂN VẬN TỈNH ỦY	Nguyễn Ngọc Túy	Phó Trưởng Ban	0919553567	
UNKNOWN	BAN TUYÊN GIÁO VÀ DÂN VẬN TỈNH ỦY	Vũ Mạnh Hùng	Chánh Văn phòng	0932289567	
UNKNOWN	BAN TUYÊN GIÁO VÀ DÂN VẬN TỈNH ỦY	Nguyễn Thị Phương	Văn thư	0946309118	
UNKNOWN	BAN TUYÊN GIÁO VÀ DÂN VẬN TỈNH ỦY	Lê Thị Thanh Nga	Văn thư	0982124344	
UNKNOWN	BAN NỘI CHÍNH TỈNH ỦY	Nguyễn Ngọc Tiến	Ủy viên Ban Thường vụ , Trưởng Ban	0912031394	
UNKNOWN	BAN NỘI CHÍNH TỈNH ỦY	Trịnh Xuân Thúy	Ủy viên BCH Đảng bộ tỉnh, Phó Trưởng Ban Thường trực	0913354466	
UNKNOWN	BAN NỘI CHÍNH TỈNH ỦY	Lê Ngọc Chiến	Phó Trưởng Ban	0834679999	
UNKNOWN	BAN NỘI CHÍNH TỈNH ỦY	Đỗ Thành Nam	Phó Trưởng Ban	0912375177	
UNKNOWN	BAN NỘI CHÍNH TỈNH ỦY	Lê Minh Hoàn	Chánh Văn phòng	0834199688	
UNKNOWN	BAN NỘI CHÍNH TỈNH ỦY	Lê Thị Phương	Văn thư	0949278282	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Lê Tiến Lam	Ủy viên BTV Tỉnh ủy, Phó Chủ tịch Thường trực HĐND tỉnh	0966511919	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Lương Thị Hoa	Tỉnh ủy viên, Phó Trưởng đoàn ĐBQH tỉnh	0915005285	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Nguyễn Quang Hải	Tỉnh ủy viên, Phó Chủ tịch HĐND tỉnh	0907338465	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Hoàng Anh Tuấn	Tỉnh ủy viên, Trưởng Ban Kinh tế - Ngân sách	0913276471	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Ngô Thị Hồng Hảo	Tỉnh ủy viên, Trưởng Ban Văn hóa - Xã hội	0912143468	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Nguyễn Quốc Hải	Trưởng Ban Pháp chế	0912055268	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Lương Tiến Thành	Trưởng Ban Dân tộc	0912605705	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Đỗ Ngọc Duy	Phó Trưởng Ban Kinh tế - Ngân sách	0912128153	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Nguyễn Tuấn Tưởng	Phó Trưởng Ban Văn hóa - Xã hội	0915300572	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Lê Thị Hương	Phó Trưởng Ban Pháp chế	0919721566	
UNKNOWN	ĐOÀN ĐBQH VÀ HĐND TỈNH	Cầm Bá Chái	Phó Trưởng Ban Dân tộc	0946628799	
UNKNOWN	VĂN PHÒNG ĐOÀN ĐBQH VÀ HĐND TỈNH	Trần Mạnh Long	Tỉnh ủy viên, Chánh Văn phòng Đoàn ĐBQH và HĐND tỉnh	0912395792	
UNKNOWN	VĂN PHÒNG ĐOÀN ĐBQH VÀ HĐND TỈNH	Lê Văn Mạnh	Phó Chánh Văn phòng Đoàn ĐBQHvà HĐND tỉnh	0968655234	
UNKNOWN	VĂN PHÒNG ĐOÀN ĐBQH VÀ HĐND TỈNH	Hà Ngọc Sơn	Phó Chánh Văn phòng Đoàn ĐBQH và HĐND tỉnh	0904818886	
UNKNOWN	VĂN PHÒNG ĐOÀN ĐBQH VÀ HĐND TỈNH	Lê Như Tú	Trưởng phòng Hành chính, Tổ chức, Quản trị	0888851974	
UNKNOWN	VĂN PHÒNG ĐOÀN ĐBQH VÀ HĐND TỈNH	Lê Thị Hương	Văn thư	0949643788	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Nguyễn Hoài Anh	Bí thư Đảng ủy	0945177199	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Mai Xuân Liêm	Phó Bí thưThường trực	0903436537	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Đỗ Hồng Quang	Phó Bí thư Đảng ủy, Chủ nhiệm UBKT	0904605888	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Lê Quang Hùng	Ủy viên Ban Thường vụ	0913293873	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Đầu Thanh Tùng	Ủy viên Ban Thường vụ	0913293086	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Cao Văn Cường	Ủy viên Ban Thường vụ	0911138999	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Nguyễn Thế Anh	Ủy viên Ban Thường vụ	0917887188	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Lê Ngọc Hợp	Ủy viên Ban Thường vụ	0912250279	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Mai Quỳnh Nga	Ủy viên BCH Đảng bộ, Phó Trưởng ban Thường trực Ban Tổ chức	0919657587	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Nguyễn Thị Huyền	Ủy viên BCH Đảng bộ, Phó Chủ nhiệm Thường trực Ủy ban kiểm tra	0989139105	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Lê Văn Vinh	Ủy viên BCH Đảng bộ, Phó Chánh Văn phòng Thường trực	0912302866	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Lại Đình Quang	Phó Trưởng Ban Tuyên giáo	0919570968	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Trương Thị Huyền	Phó Chủ nhiệm Ủy ban kiểm tra	0942071176	
UNKNOWN	ĐẢNG ỦY ỦY BAN NHÂN DÂN TỈNH	Lê Thị Hà	Kế toán + Văn thư	0987424988	
UNKNOWN	THƯỜNG TRỰC UBND TỈNH	Nguyễn Hoài Anh	Phó Bí thư Tỉnh ủy, Chủ tịch UBND tỉnh	0945177199	
UNKNOWN	THƯỜNG TRỰC UBND TỈNH	Mai Xuân Liêm	Phó Chủ tịch TTr UBND tỉnh	0903436537	
UNKNOWN	THƯỜNG TRỰC UBND TỈNH	Lê Quang Hùng	Phó Chủ tịch UBND tỉnh	0913293873	
UNKNOWN	THƯỜNG TRỰC UBND TỈNH	Đầu Thanh Tùng	Phó Chủ tịch UBND tỉnh	0913293086	
UNKNOWN	THƯỜNG TRỰC UBND TỈNH	Cao Văn Cường	Phó Chủ tịch UBND tỉnh	0911138999	
UNKNOWN	VĂN PHÒNG UBND TỈNH	Nguyễn Thế Anh	Chánh Văn phòng	0917887188	
UNKNOWN	VĂN PHÒNG UBND TỈNH	Lê Việt Hiếu	Phó Chánh Văn phòng	0913026343	
UNKNOWN	VĂN PHÒNG UBND TỈNH	Hoàng Văn Thi	Phó Chánh Văn phòng	0912276373	
UNKNOWN	VĂN PHÒNG UBND TỈNH	Mai Huy Hoàng	Phó Chánh Văn phòng	0912276627	
UNKNOWN	VĂN PHÒNG UBND TỈNH	Nguyễn Thị Minh	Trưởng phòng Hành chính - Tổ chức	0972808077	
UNKNOWN	VĂN PHÒNG UBND TỈNH	Lê Thị Thu Hiền	Phó TP. HCTC (phụ trách Văn thư)	0974873456	
UNKNOWN	SỞ TÀI CHÍNH	Lê Trọng Thụ	Giám đốc	0915369919	
UNKNOWN	SỞ TÀI CHÍNH	Nguyễn Đức Thịnh	Phó Giám đốc	0912293495	
UNKNOWN	SỞ TÀI CHÍNH	Phạm Việt Bắc	Phó Giám đốc	0912383686	
UNKNOWN	SỞ TÀI CHÍNH	Nguyễn Thị Mai Phương	Phó Giám đốc	0912381389	
UNKNOWN	SỞ TÀI CHÍNH	Trần Việt Hùng	Chánh Văn phòng	0916569156	
UNKNOWN	SỞ TÀI CHÍNH	Hoàng Thị Thu Huyền	Văn thư	0913313366	
UNKNOWN	SỞ NỘI VỤ	Lê Ngọc Hợp	Giám đốc	0912250279	
UNKNOWN	SỞ NỘI VỤ	Nguyễn Văn Chiến	Phó Giám đốc	0913313277	
UNKNOWN	SỞ NỘI VỤ	Hoàng Ngọc Trung	Phó Giám đốc	0916563639	
UNKNOWN	SỞ NỘI VỤ	Lê Thanh Triều	Phó Giám đốc	0919760345	
UNKNOWN	SỞ NỘI VỤ	Lê Tiến Hải	Chánh Văn phòng	0984812849	
UNKNOWN	SỞ NỘI VỤ	Nguyễn Thị Hà	Văn thư	0912648521	
UNKNOWN	SỞ NỘI VỤ	Đầu Thị Linh Trang	Văn thư	0398609666	
UNKNOWN	SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG	Lê Văn Tiến	Giám đốc	0968200666	
UNKNOWN	SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG	Nguyễn Đức Cường	Phó Giám đốc	0912957818	
UNKNOWN	SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG	Nguyễn Khánh Toàn	Phó Giám đốc	0903479568	
UNKNOWN	SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG	Nguyễn Hoài Nam	Phó Giám đốc	0915331979	
UNKNOWN	SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG	Nguyễn Hữu Trung	Chánh Văn phòng	0979084968	
UNKNOWN	SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG	Trần Thị Lê	Văn thư	0918285097	
UNKNOWN	SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG	Nguyễn Thị Nhung	Văn thư	0979200052	
UNKNOWN	SỞ NÔNG NGHIỆP VÀ MÔI TRƯỜNG	Nguyễn Thị Thương	Văn thư	0973462786	
UNKNOWN	SỞ XÂY DỰNG	Hoàng Văn Đồng	Giám đốc	0912601366	
UNKNOWN	SỞ XÂY DỰNG	Lại Thế Khái	Phó Giám đốc	0916599929	
UNKNOWN	SỞ XÂY DỰNG	Phạm Văn Tuấn	Phó Giám đốc	0912001123	
UNKNOWN	SỞ XÂY DỰNG	Nguyễn Thị Phương	Văn thư	0917327238	
UNKNOWN	SỞ XÂY DỰNG	Lê Thị Phương	Văn thư	0914320249	
UNKNOWN	SỞ Y TẾ	Lê Văn Cường	Giám đốc	0967338899	
UNKNOWN	SỞ Y TẾ	Đỗ Thái Hòa	Phó Giám đốc	0888439333	
UNKNOWN	SỞ Y TẾ	Trần Văn Hùng	Phó Giám đốc	0982373228	
UNKNOWN	SỞ Y TẾ	Lê Anh Hiếu	Phó Giám đốc	0918228899	
UNKNOWN	SỞ Y TẾ	Vũ Huy Vượng	Chánh Văn phòng	0915917186	
UNKNOWN	SỞ Y TẾ	Trần Lê Hà	Văn thư	0984812823	
UNKNOWN	SỞ CÔNG THƯƠNG	Nguyễn Tiến Hiệu	Giám đốc	0912605625	
UNKNOWN	SỞ CÔNG THƯƠNG	Lê Tiến Dũng	Phó Giám đốc	0982241789	
UNKNOWN	SỞ CÔNG THƯƠNG	Phùng Đình Ảnh	Phó Giám đốc	0913003770	
UNKNOWN	SỞ CÔNG THƯƠNG	Nguyễn Xuân Thắng	Chánh Văn phòng	0971363888	
UNKNOWN	SỞ CÔNG THƯƠNG	Nguyễn Thị Sen	Văn thư	0943396662	
UNKNOWN	SỞ VĂN HÓA, THỂ THAO VÀ DU LỊCH	Lê Văn Trung	Giám đốc	0936015456	
UNKNOWN	SỞ VĂN HÓA, THỂ THAO VÀ DU LỊCH	Vương Thị Hải Yến	Phó Giám đốc	0945354868	
UNKNOWN	SỞ VĂN HÓA, THỂ THAO VÀ DU LỊCH	Đỗ Quang Trọng	Phó Giám đốc	0912001151	
UNKNOWN	SỞ VĂN HÓA, THỂ THAO VÀ DU LỊCH	Lê Văn Nam	Phó Giám đốc	0912604187	
UNKNOWN	SỞ VĂN HÓA, THỂ THAO VÀ DU LỊCH	Nguyễn Duy Tự	Phó Giám đốc	0932346818	
UNKNOWN	SỞ VĂN HÓA, THỂ THAO VÀ DU LỊCH	Tống Văn Thành	Quyền Chánh Văn phòng	0982244175	
UNKNOWN	SỞ VĂN HÓA, THỂ THAO VÀ DU LỊCH	Hoàng Thị Phượng	Văn thư	0982199788	
UNKNOWN	SỞ VĂN HÓA, THỂ THAO VÀ DU LỊCH	Nguyễn Thị Hồng Nga	Văn thư	0919907369	
UNKNOWN	SỞ KHOA HỌC VÀ CÔNG NGHỆ	Trần Duy Bình	Giám đốc	0913390344	
UNKNOWN	SỞ KHOA HỌC VÀ CÔNG NGHỆ	Trịnh Văn Súy	Phó Giám đốc	0982199888	
UNKNOWN	SỞ KHOA HỌC VÀ CÔNG NGHỆ	Cao Thị Ngọc Hà	Phó Giám đốc	0916995486	
UNKNOWN	SỞ KHOA HỌC VÀ CÔNG NGHỆ	Nguyễn Văn Tước	Phó Giám đốc	0888898858	
UNKNOWN	SỞ KHOA HỌC VÀ CÔNG NGHỆ	Lê Sỹ Chung	Chánh Văn phòng	0988922142	
UNKNOWN	SỞ KHOA HỌC VÀ CÔNG NGHỆ	Lê Thị Xuân	Văn thư	0977789886	
UNKNOWN	SỞ GIÁO DỤC VÀ ĐÀO TẠO	Đỗ Đức Quế	Giám đốc	0984150666	
UNKNOWN	SỞ GIÁO DỤC VÀ ĐÀO TẠO	Nguyễn Văn Dĩnh	Phó Giám đốc	0986930803	
UNKNOWN	SỞ GIÁO DỤC VÀ ĐÀO TẠO	Bùi Thị Thanh	Phó Giám đốc	0982133672	
UNKNOWN	SỞ GIÁO DỤC VÀ ĐÀO TẠO	Nguyễn Văn Dũng	Chánh Văn phòng	0974781289	
UNKNOWN	SỞ GIÁO DỤC VÀ ĐÀO TẠO	Nguyễn Thị Thìn	Văn thư	0949337800	
UNKNOWN	SỞ NGOẠI VỤ	Trần Thị Thu Hằng	Giám đốc	0912384385	
UNKNOWN	SỞ NGOẠI VỤ	Mai Văn Thoại	Phó Giám đốc	0948377678	
UNKNOWN	SỞ NGOẠI VỤ	Vũ Ngọc Dương	Phó Giám đốc	0928191688	
UNKNOWN	SỞ NGOẠI VỤ	Nguyễn Hoàng Minh	Chánh Văn phòng	0919761277	
UNKNOWN	SỞ NGOẠI VỤ	Nguyễn Thị Dung	Văn thư	0902712133	
UNKNOWN	THANH TRA TỈNH	Vũ Văn Đạt	Chánh Thanh tra	0868377666~+84904783813	
UNKNOWN	THANH TRA TỈNH	Trương Nho Tự	Phó Chánh Thanh tra	0915364738	
UNKNOWN	THANH TRA TỈNH	Nguyễn Văn Đồng	Phó Chánh Thanh tra	0968335288	
UNKNOWN	THANH TRA TỈNH	Phạm Xuân Dũng	Phó Chánh Thanh tra	0812248999	
UNKNOWN	THANH TRA TỈNH	Trịnh Việt Hùng	Phó Chánh Thanh tra	0912943646	
UNKNOWN	THANH TRA TỈNH	Cao Việt Hùng	Chánh Văn phòng	0915320424	
UNKNOWN	THANH TRA TỈNH	Vũ Thị Hương Giang	Văn thư	0917516263	
UNKNOWN	SỞ DÂN TỘC VÀ TÔN GIÁO	Vũ Thị Hương	Giám đốc	0915468345	
UNKNOWN	SỞ DÂN TỘC VÀ TÔN GIÁO	Cầm Bá Tường	Phó Giám đốc	0948833683	
UNKNOWN	SỞ DÂN TỘC VÀ TÔN GIÁO	Lê Minh Hành	Phó Giám đốc	0985506556	
UNKNOWN	SỞ DÂN TỘC VÀ TÔN GIÁO	Mai Danh Hải	Chánh Văn phòng	0912987576	
UNKNOWN	SỞ DÂN TỘC VÀ TÔN GIÁO	Mai Thị Quỳnh	Văn thư	0944809638	
UNKNOWN	SỞ TƯ PHÁP	Mai Xuân Bình	Giám đốc	0939689868	
UNKNOWN	SỞ TƯ PHÁP	Lê Ngọc Minh	Phó Giám đốc	0981188872	
UNKNOWN	SỞ TƯ PHÁP	Nguyễn Đình Bình	Chánh Văn phòng	0915142599	
UNKNOWN	SỞ TƯ PHÁP	Mai Thị Sâm	Văn thư	0989373388	
UNKNOWN	CÔNG AN TỈNH	Tô Anh Dũng	Giám đốc	0933585858~+84906988889	
UNKNOWN	CÔNG AN TỈNH	Trần Thái Quang Hoàng	Phó Giám đốc	0915019977~+84933726666	
UNKNOWN	CÔNG AN TỈNH	Nguyễn Anh Tuấn	Phó Giám đốc	0906156686	
UNKNOWN	CÔNG AN TỈNH	Lê Ngọc Anh	Phó Giám đốc	0983507789~+84931771199	
UNKNOWN	CÔNG AN TỈNH	Trịnh Văn Giang	Phó Giám đốc	0963382399	
UNKNOWN	CÔNG AN TỈNH	Kim Duy Cương	Phó Giám đốc	0965942666	
UNKNOWN	CÔNG AN TỈNH	Trần Văn Xuân	Trưởng phòng Tham mưu	0943110559	
UNKNOWN	CÔNG AN TỈNH	Lê Thị Trang	Văn thư	0692889328	
UNKNOWN	BỘ CHỈ HUY QUÂN SỰ TỈNH	Vũ Văn Tùng	Đại tá, Ủy viên BTV Tỉnh ủy, Chỉ huy trưởng	0985170555	
UNKNOWN	BỘ CHỈ HUY QUÂN SỰ TỈNH	Phạm Văn Sâm	Đại tá, Chính ủy	0989160377	
UNKNOWN	BỘ CHỈ HUY QUÂN SỰ TỈNH	Nguyễn Trọng Nhị	Đại tá, Phó Chỉ huy trưởng - Tham mưu trưởng	0982743437	
UNKNOWN	BỘ CHỈ HUY QUÂN SỰ TỈNH	Nguyễn Hữu Vũ	Đại tá, Phó Chỉ huy trưởng	0988835037	
UNKNOWN	BỘ CHỈ HUY QUÂN SỰ TỈNH	Trần Hữu Tùng	Đại tá, Phó Chỉ huy trưởng	0989817223	
UNKNOWN	BỘ CHỈ HUY QUÂN SỰ TỈNH	Lê Thế Soái	Đại tá, Phó Chỉ huy trưởng	0334272676	
UNKNOWN	BỘ CHỈ HUY QUÂN SỰ TỈNH	Vũ Mạnh Quỳnh	Đại tá, Phó Chỉ huy trưởng	0982018766	
UNKNOWN	BỘ CHỈ HUY QUÂN SỰ TỈNH	Nguyễn Xuân Toàn	Đại tá, Phó Chính ủy	0961212789	
UNKNOWN	BỘ CHỈ HUY QUÂN SỰ TỈNH	Nguyễn Văn Tuân	Thiếu tá CN, Nhân viên Văn thư - Bảo mật	0975798307	
UNKNOWN	BAN CHỈ HUY BỘ ĐỘI BIÊN PHÒNG	Đỗ Ngọc Vĩnh	Chỉ huy trưởng	0915134586	
UNKNOWN	BAN CHỈ HUY BỘ ĐỘI BIÊN PHÒNG	Hoàng Văn Hùng	Chính uỷ	0963503737	
UNKNOWN	BAN CHỈ HUY BỘ ĐỘI BIÊN PHÒNG	Lê Văn Nam	Phó Chỉ huy trưởng kiêm TMT	0965292809	
UNKNOWN	BAN CHỈ HUY BỘ ĐỘI BIÊN PHÒNG	Trương Ngọc Tùng	Phó Chỉ huy trưởng nghiệp vụ	0974738888	
UNKNOWN	BAN CHỈ HUY BỘ ĐỘI BIÊN PHÒNG	Lê Hữu Bản	Phó Chỉ huy trưởng	0983979111	
UNKNOWN	BAN CHỈ HUY BỘ ĐỘI BIÊN PHÒNG	Nguyễn Văn Đông	Phó Chính uỷ	0983616475	
UNKNOWN	BAN CHỈ HUY BỘ ĐỘI BIÊN PHÒNG	Nguyễn Ngọc Văn	Phó TMT, Chánh Văn phòng	0972816555	
UNKNOWN	BAN CHỈ HUY BỘ ĐỘI BIÊN PHÒNG	Nguyễn Văn Nam	Văn thư	0963491616	
UNKNOWN	BAN QUẢN LÝ KHU KINH TẾ NGHI SƠN VÀ CÁC KHU CÔNG NGHIỆP	Trịnh Huy Triều	Trưởng Ban	0913529930	
UNKNOWN	BAN QUẢN LÝ KHU KINH TẾ NGHI SƠN VÀ CÁC KHU CÔNG NGHIỆP	Nguyễn Anh Tuấn	Phó Trưởng Ban	0912071944	
UNKNOWN	BAN QUẢN LÝ KHU KINH TẾ NGHI SƠN VÀ CÁC KHU CÔNG NGHIỆP	Trần Chí Thanh	Phó Trưởng Ban	0913043757	
UNKNOWN	BAN QUẢN LÝ KHU KINH TẾ NGHI SƠN VÀ CÁC KHU CÔNG NGHIỆP	Chúc Anh Tuấn	Chánh Văn phòng	0916795222	
UNKNOWN	BAN QUẢN LÝ KHU KINH TẾ NGHI SƠN VÀ CÁC KHU CÔNG NGHIỆP	Vũ Thị Nhân	Văn thư	0973737537	
THÀNH PHỐ THANH HÓA	PHƯỜNG HẠC THÀNH	Nguyễn Văn Biện	Bí thư Đảng ủy, Chủ tịch HĐND phường	0915037666	
THÀNH PHỐ THANH HÓA	PHƯỜNG HẠC THÀNH	Nguyễn Anh Tuấn	Phó Bí thư Thường trực Đảng ủy phường	0904246677	
THÀNH PHỐ THANH HÓA	PHƯỜNG HẠC THÀNH	Lê Bá Hải	Phó Bí thư, Chủ tịch UBND phường	0988500944	
THÀNH PHỐ THANH HÓA	PHƯỜNG HẠC THÀNH	Nguyễn Văn Nam	Chánh VP HĐND&UBND	0983860026	
THÀNH PHỐ THANH HÓA	PHƯỜNG HẠC THÀNH	Nguyễn Thị Trang	Văn thư	0947812909	
THÀNH PHỐ THANH HÓA	PHƯỜNG QUẢNG PHÚ	Trịnh Tuấn Thành	Bí thư Đảng ủy, Chủ tịch HĐND	0913293468	
THÀNH PHỐ THANH HÓA	PHƯỜNG QUẢNG PHÚ	Nguyễn Thị Thu Hà	Phó Bí thư Thường trực Đảng ủy	0911262618	
THÀNH PHỐ THANH HÓA	PHƯỜNG QUẢNG PHÚ	Nghiêm Phú Lâm	Phó Bí thư, Chủ tịch UBND phường	0915548447	
THÀNH PHỐ THANH HÓA	PHƯỜNG QUẢNG PHÚ	Đào Thị Thanh Thanh	Chánh Văn phòng	0972134366	
THÀNH PHỐ THANH HÓA	PHƯỜNG QUẢNG PHÚ	Lê Thị Liên	Văn thư	0983452956	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG QUANG	Phan Lê Quang	Bí thư Đảng ủy, Chủ tịch HĐND	0933566868	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG QUANG	Hoàng Quang Khoa	Phó Bí thư Thường trực Đảng ủy	0904906789	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG QUANG	Hoàng Văn Hưng	Phó Bí thư, Chủ tịch UBND phường	0911283368	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG QUANG	Hà Việt Bắc	Q. Chánh Văn phòng	0913468363	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG QUANG	Nguyễn Thị Hằng	Văn thư	0948747835	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG SƠN	Nguyễn Văn Tứ	Bí thư Đảng ủy, Chủ tịch HĐND	0985362836	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG SƠN	Lê Thị Phương	Phó Bí thư Thường trực Đảng ủy	0989535606	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG SƠN	Lê Anh Đức	Phó Bí thư, Chủ tịch UBND phường	0866269899	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG SƠN	Lê Trọng Trung	Chánh Văn phòng	0987424785	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG SƠN	Phạm Thị Xuân	Văn thư	0973255328	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG TIẾN	Nguyễn Thị Hiền	Bí thư Đảng ủy, Chủ tịch HĐND	0968627114	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG TIẾN	Nguyễn Thị Thủy	Phó Bí thư Thường trực Đảng ủy	0969866899	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG TIẾN	Nguyễn Hồng Quang	Phó Bí thư, Chủ tịch UBND phường	0912987912	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG TIẾN	Hà Đình Anh	Chánh Văn phòng	0914802005	
THÀNH PHỐ THANH HÓA	PHƯỜNG ĐÔNG TIẾN	Cao Thị Thắm	Văn thư	0963753998	
THÀNH PHỐ THANH HÓA	PHƯỜNG HÀM RỒNG	Nguyễn Việt Hùng	Bí thư Đảng ủy	0913293329	
THÀNH PHỐ THANH HÓA	PHƯỜNG HÀM RỒNG	Phạm Thị Thúy	Phó Bí thư Thường trực Đảng ủy	0867963968	
THÀNH PHỐ THANH HÓA	PHƯỜNG HÀM RỒNG	Phạm Đức Toàn	Phó Bí thư, Chủ tịch UBND phường	0904861599	
THÀNH PHỐ THANH HÓA	PHƯỜNG HÀM RỒNG	Nguyễn Đăng Trường	Phó Chánh Văn phòng, phụ trách Văn Phòng	0942688236	
THÀNH PHỐ THANH HÓA	PHƯỜNG HÀM RỒNG	Nguyễn Thị Hải	Văn thư	0335390798	
THÀNH PHỐ THANH HÓA	PHƯỜNG NGUYỆT VIÊN	Lê Quang Hiển	Bí thư Đảng ủy, Chủ tịch HĐND	0912786123	
THÀNH PHỐ THANH HÓA	PHƯỜNG NGUYỆT VIÊN	Lê Văn Tùng	Phó Bí thư Thường trực Đảng ủy	0986946999	
THÀNH PHỐ THANH HÓA	PHƯỜNG NGUYỆT VIÊN	Đồng Văn Long	Phó Bí thư, Chủ tịch UBND phường	0916139399	
THÀNH PHỐ THANH HÓA	PHƯỜNG NGUYỆT VIÊN	Lê Thiệu Phúc	Chánh Văn phòng	0948210177	
THÀNH PHỐ THANH HÓA	PHƯỜNG NGUYỆT VIÊN	Lê Thị Thơm	Văn thư	0376222789	
THÀNH PHỐ SẦM SƠN	PHƯỜNG SẦM SƠN	Lê Văn Tuấn	Bí thư Đảng ủy, Chủ tịch HĐND	0913313475	
THÀNH PHỐ SẦM SƠN	PHƯỜNG SẦM SƠN	Bùi Quốc Đạt	Phó Bí thư Thường trực Đảng ủy	0914673168	
THÀNH PHỐ SẦM SƠN	PHƯỜNG SẦM SƠN	Trịnh Tiến Dũng	Phó Bí thư, Chủ tịch UBND phường	0919614001	
THÀNH PHỐ SẦM SƠN	PHƯỜNG SẦM SƠN	Mai Thành Đồng	Chánh Văn phòng	0978804486	
THÀNH PHỐ SẦM SƠN	PHƯỜNG SẦM SƠN	Nguyễn Thị Hồng Phúc	Văn thư	0982606438	
THÀNH PHỐ SẦM SƠN	PHƯỜNG SẦM SƠN	Phan Thị Hoa	Văn thư	0942727975	
THÀNH PHỐ SẦM SƠN	PHƯỜNG NAM SẦM SƠN	Lê Trung Sơn	Bí thư Đảng ủy phường	0912139671	
THÀNH PHỐ SẦM SƠN	PHƯỜNG NAM SẦM SƠN	Lê Ngọc Khanh	Phó Bí thư Thường trực Đảng ủy	0945825246	
THÀNH PHỐ SẦM SƠN	PHƯỜNG NAM SẦM SƠN	Lưu Hùng Sơn	Phó Bí thư, Chủ tịch UBND phường	0903499171	
THÀNH PHỐ SẦM SƠN	PHƯỜNG NAM SẦM SƠN	Nguyễn Mai Hiên	Chánh Văn phòng	0905706666	
THÀNH PHỐ SẦM SƠN	PHƯỜNG NAM SẦM SƠN	Hoàng Văn Hải	Văn thư	0934585004	
THỊ XÃ BỈM SƠN	PHƯỜNG BỈM SƠN	Nguyễn Văn Khiên	Bí thư Đảng ủy	0985577636	
THỊ XÃ BỈM SƠN	PHƯỜNG BỈM SƠN	Dương Văn Đông	Phó Bí thư Thường trực Đảng ủy	0949359893	
THỊ XÃ BỈM SƠN	PHƯỜNG BỈM SƠN	Nguyễn Thanh Tùng	Phó Bí thư, Chủ tịch UBND phường	0912005204	
THỊ XÃ BỈM SƠN	PHƯỜNG BỈM SƠN	Nguyễn Duy Chinh	Chánh Văn phòng	0949899188	
THỊ XÃ BỈM SƠN	PHƯỜNG BỈM SƠN	Lê Thị Dung	Văn thư	0949014984	
THỊ XÃ BỈM SƠN	PHƯỜNG QUANG TRUNG	Lê Văn Tú	Bí thư Đảng ủy, Chủ tịch HĐND	0949788668	
THỊ XÃ BỈM SƠN	PHƯỜNG QUANG TRUNG	Nguyễn Xuân Chiến	Phó Bí thư Thường trực Đảng ủy	0919688345	
THỊ XÃ BỈM SƠN	PHƯỜNG QUANG TRUNG	Mai Đình Lâm	Phó Bí thư, Chủ tịch UBND phường	0912143222	
THỊ XÃ BỈM SƠN	PHƯỜNG QUANG TRUNG	Lê Thị Hoa	Chánh Văn phòng	0947263359	
THỊ XÃ BỈM SƠN	PHƯỜNG QUANG TRUNG	Dương Thị Hiền	Văn thư	0914548366	
THỊ XÃ NGHI SƠN	PHƯỜNG TĨNH GIA	Trịnh Xuân Phú	Bí thư Đảng ủy, Chủ tịch HĐND	0904129369	
THỊ XÃ NGHI SƠN	PHƯỜNG TĨNH GIA	Trần Thị Vân	Phó Bí thư Thường trực Đảng ủy	0949087429	
THỊ XÃ NGHI SƠN	PHƯỜNG TĨNH GIA	Đặng Văn Quang	Phó Bí thư, Chủ tịch UBND phường	0945247333	
THỊ XÃ NGHI SƠN	PHƯỜNG TĨNH GIA	Lê Văn Sơn	Chánh Văn phòng	0983924675	
THỊ XÃ NGHI SƠN	PHƯỜNG TĨNH GIA	Đặng Thị Hoài	Văn thư	0981625682	
THỊ XÃ NGHI SƠN	PHƯỜNG NGHI SƠN	Trần Hạnh Phúc	Bí thư Đảng ủy	0949001558	
THỊ XÃ NGHI SƠN	PHƯỜNG NGHI SƠN	Đào Văn Bắc	Phó Bí thư Thường trực Đảng ủy	0942741977	
THỊ XÃ NGHI SƠN	PHƯỜNG NGHI SƠN	Cao Lương Ngọc	Phó Bí thư, Chủ tịch UBND phường	0982623168	
THỊ XÃ NGHI SƠN	PHƯỜNG NGHI SƠN	Trần Công Mạnh	Chánh Văn phòng	0915656898	
THỊ XÃ NGHI SƠN	PHƯỜNG NGHI SƠN	Vũ Mạnh Thành	Văn thư	0973914387	
THỊ XÃ NGHI SƠN	PHƯỜNG HẢI LĨNH	Cao Thanh Tùng	Bí thư Đảng ủy	0912276667	
THỊ XÃ NGHI SƠN	PHƯỜNG HẢI LĨNH	Phạm Nhật Tân	Phó Bí thư Thường trực Đảng ủy	0913293708	
THỊ XÃ NGHI SƠN	PHƯỜNG HẢI LĨNH	Mai Xuân Thắng	Phó Bí thư, Chủ tịch UBND phường	0948412777	
THỊ XÃ NGHI SƠN	PHƯỜNG HẢI LĨNH	Mai Xuân Minh	Chánh Văn phòng	0973641445	
THỊ XÃ NGHI SƠN	PHƯỜNG HẢI LĨNH	Lê Văn Nhinh	Văn thư	0383922821	
THỊ XÃ NGHI SƠN	PHƯỜNG TÂN DÂN	Trương Bá Duyên	Bí thư Đảng ủy	0948458686	
THỊ XÃ NGHI SƠN	PHƯỜNG TÂN DÂN	Lê Thị Kim Hằng	Phó Bí thư Thường trực Đảng ủy	0988130880	
THỊ XÃ NGHI SƠN	PHƯỜNG TÂN DÂN	Hoàng Bá Trung	Phó Bí thư, Chủ tịch UBND phường	0912316003	
THỊ XÃ NGHI SƠN	PHƯỜNG TÂN DÂN	Lường Đình Thu	Chánh Văn phòng	0983710794	
THỊ XÃ NGHI SƠN	PHƯỜNG TÂN DÂN	Lê Vũ Thu Hương	Văn thư	0982522493	
THỊ XÃ NGHI SƠN	PHƯỜNG TRÚC LÂM	Bùi Tuấn Tự	Bí thư Đảng ủy	0912604658	
THỊ XÃ NGHI SƠN	PHƯỜNG TRÚC LÂM	Lê Thế Ái	Phó Bí thư Thường trực Đảng ủy	0936506555	
THỊ XÃ NGHI SƠN	PHƯỜNG TRÚC LÂM	Mai Cao Cường	Phó Bí thư, Chủ tịch UBND phường	0983339696	
THỊ XÃ NGHI SƠN	PHƯỜNG TRÚC LÂM	Trần Văn Ngọc	Chánh Văn phòng	0365940272	
THỊ XÃ NGHI SƠN	PHƯỜNG TRÚC LÂM	Trần Thị Anh	Văn thư	0989892412	
THỊ XÃ NGHI SƠN	PHƯỜNG ĐÀO DUY TỪ	Đinh Văn Minh	Bí thư Đảng ủy	0981361956	
THỊ XÃ NGHI SƠN	PHƯỜNG ĐÀO DUY TỪ	Nguyễn Huy Trọng	Phó Bí thư Thường trực Đảng ủy	0912442382	
THỊ XÃ NGHI SƠN	PHƯỜNG ĐÀO DUY TỪ	Lê Duy Trung	Phó Bí thư, Chủ tịch UBND phường	0915255405	
THỊ XÃ NGHI SƠN	PHƯỜNG ĐÀO DUY TỪ	Nguyễn Kim Khuê	Chánh Văn phòng	0915597861	
THỊ XÃ NGHI SƠN	PHƯỜNG ĐÀO DUY TỪ	Đỗ Thị Tâm	Văn thư	0365144377	
THỊ XÃ NGHI SƠN	PHƯỜNG NGỌC SƠN	Mai Sỹ Lân	Bí thư Đảng ủy	0912277004	
THỊ XÃ NGHI SƠN	PHƯỜNG NGỌC SƠN	Lê Ngọc Hà	Phó Bí thư Thường trực Đảng ủy	0976433818	
THỊ XÃ NGHI SƠN	PHƯỜNG NGỌC SƠN	Lê Thế Sơn	Phó Bí thư, Chủ tịch UBND phường	0972401456	
THỊ XÃ NGHI SƠN	PHƯỜNG NGỌC SƠN	Lê Đình Thắng	Chánh Văn phòng	0888219919	
THỊ XÃ NGHI SƠN	PHƯỜNG NGỌC SƠN	Hoàng Thị Lan	Văn thư	0975960942	
THỊ XÃ NGHI SƠN	PHƯỜNG HẢI BÌNH	Nguyễn Quốc Đạt	Bí thư Đảng ủy, Chủ tịch HĐND	0983087268	
THỊ XÃ NGHI SƠN	PHƯỜNG HẢI BÌNH	Dương Thị Hằng	Phó Bí thư Thường trực Đảng ủy	0949087271	
THỊ XÃ NGHI SƠN	PHƯỜNG HẢI BÌNH	Phạm Hoài Nam	Phó Bí thư, Chủ tịch UBND phường	0943077099	
THỊ XÃ NGHI SƠN	PHƯỜNG HẢI BÌNH	Hồ Sỹ Tùng	Chánh Văn phòng	0974962023	
THỊ XÃ NGHI SƠN	PHƯỜNG HẢI BÌNH	Phạm Ngọc Quân	Văn thư	0972718842	
THỊ XÃ NGHI SƠN	XÃ CÁC SƠN	Phạm Văn Nhiệm	Bí thư Đảng ủy	0978798111	
THỊ XÃ NGHI SƠN	XÃ CÁC SƠN	Trần Danh Long	Phó Bí thư Thường trực Đảng ủy	0916116114	
THỊ XÃ NGHI SƠN	XÃ CÁC SƠN	Nguyễn Tuấn Anh	Phó Bí thư, Chủ tịch UBND xã	0982028858	
THỊ XÃ NGHI SƠN	XÃ CÁC SƠN	Nguyễn Ngọc Hinh	Chánh Văn phòng	0966927313	
THỊ XÃ NGHI SƠN	XÃ CÁC SƠN	Mai Hồng Quyền	Văn thư	0989457919	
THỊ XÃ NGHI SƠN	XÃ TRƯỜNG LÂM	Lê Văn Thông	Bí thư Đảng ủy, Chủ tịch HĐND	0983756118	
THỊ XÃ NGHI SƠN	XÃ TRƯỜNG LÂM	Nguyễn Văn Thanh	Phó Bí thư Thường trực Đảng ủy	0936827894	
THỊ XÃ NGHI SƠN	XÃ TRƯỜNG LÂM	Lê Hồng Thanh	Phó Bí thư, Chủ tịch UBND xã	0913168118	
THỊ XÃ NGHI SƠN	XÃ TRƯỜNG LÂM	Trần Văn Trang	Chánh Văn phòng	0945807885	
THỊ XÃ NGHI SƠN	XÃ TRƯỜNG LÂM	Lê Thị Đức	Văn thư	0972296397	
HUYỆN NGA SƠN	XÃ NGA SƠN	Đào Vũ Việt	Bí thư Đảng ủy	0974749888	
HUYỆN NGA SƠN	XÃ NGA SƠN	Đỗ Minh Sơn	Phó Bí thư Thường trực Đảng ủy	0919869656	
HUYỆN NGA SƠN	XÃ NGA SƠN	Lê Ngọc Khánh	Phó Bí thư, Chủ tịch UBND xã	0912250733	
HUYỆN NGA SƠN	XÃ NGA SƠN	Nguyễn Văn Hải	Chánh Văn phòng	0982570318	
HUYỆN NGA SƠN	XÃ NGA SƠN	Mai Thị Nga	Văn thư	0989697565	
HUYỆN NGA SƠN	XÃ HỒ VƯƠNG	Hàn Duy Điều	Bí thư Đảng ủy	0912395165	
HUYỆN NGA SƠN	XÃ HỒ VƯƠNG	Mai Văn Quang	Phó Bí thư Thường trực Đảng ủy	0918070929	
HUYỆN NGA SƠN	XÃ HỒ VƯƠNG	Hỏa Ngọc Cương	Phó Bí thư, Chủ tịch UBND xã	0943931889	
HUYỆN NGA SƠN	XÃ HỒ VƯƠNG	Hồ Huy Hoàn	Chánh Văn phòng	0949163474	
HUYỆN NGA SƠN	XÃ HỒ VƯƠNG	Phạm Thị Loan	Văn thư	0985006710	
HUYỆN NGA SƠN	XÃ NGA THẮNG	Trịnh Văn Tiến	Bí thư Đảng ủy	0918077276	
HUYỆN NGA SƠN	XÃ NGA THẮNG	Phạm Văn Thành	Phó Bí thư Thường trực Đảng ủy	0915925836	
HUYỆN NGA SƠN	XÃ NGA THẮNG	Mai Văn Công	Phó Bí thư, Chủ tịch UBND xã	0943908017	
HUYỆN NGA SƠN	XÃ NGA THẮNG	Nguyễn Văn Dịp	Chánh Văn phòng	0912690322	
HUYỆN NGA SƠN	XÃ NGA THẮNG	Mai Thị Thu	Văn thư	0915732119	
HUYỆN NGA SƠN	XÃ TÂN TIẾN	Trương Thị Hiền	Bí thư Đảng ủy	0918069196	
HUYỆN NGA SƠN	XÃ TÂN TIẾN	Mai Thị Hà	Phó Bí thư Thường trực Đảng ủy	0942780676	
HUYỆN NGA SƠN	XÃ TÂN TIẾN	Mai Văn Tài	Phó Bí thư, Chủ tịch UBND xã	0912395163	
HUYỆN NGA SƠN	XÃ TÂN TIẾN	Nguyễn Văn Thắng	Chánh Văn phòng	0834175022	
HUYỆN NGA SƠN	XÃ TÂN TIẾN	Lê Thị Thắm	Văn thư	0357097672	
HUYỆN NGA SƠN	XÃ BA ĐÌNH	Thịnh Văn Huyên	Bí thư Đảng ủy, Chủ tịch HĐND	0919056567	
HUYỆN NGA SƠN	XÃ BA ĐÌNH	Nghiêm Xuân Hà	Phó Bí thư Thường trực Đảng ủy	0912653369	
HUYỆN NGA SƠN	XÃ BA ĐÌNH	Đào Ngọc Đức	Phó Bí thư, Chủ tịch UBND xã	0913298123	
HUYỆN NGA SƠN	XÃ BA ĐÌNH	Mai Doãn Hảo	Chánh Văn phòng	0967817383	
HUYỆN NGA SƠN	XÃ BA ĐÌNH	Hoàng Thị Hoa	Văn thư	0815098266	
HUYỆN NGA SƠN	XÃ NGA AN	Vũ Văn Hùng	Bí thư Đảng ủy	0914539186	
HUYỆN NGA SƠN	XÃ NGA AN	Mai Văn Dũng	Phó Bí thư Thường trực Đảng ủy	0904131259	
HUYỆN NGA SƠN	XÃ NGA AN	Mai Văn Quang	Phó Bí thư, Chủ tịch UBND xã	0912695181	
HUYỆN NGA SƠN	XÃ NGA AN	Đinh Văn Tuệ	Chánh Văn phòng	0945533279	
HUYỆN NGA SƠN	XÃ NGA AN	Hoàng Thị Dung	Văn thư	0981625682	
HUYỆN HẬU LỘC	XÃ HẬU LỘC	Trần Đức Lương	Bí thư Đảng ủy, Chủ tịch HĐND	0984656789	
HUYỆN HẬU LỘC	XÃ HẬU LỘC	Lê Xuân Hòa	Phó Bí thư Thường trực Đảng ủy	0977894568	
HUYỆN HẬU LỘC	XÃ HẬU LỘC	Trịnh Cao Sơn	Phó Bí thư, Chủ tịch UBND xã	0901955666	
HUYỆN HẬU LỘC	XÃ HẬU LỘC	Đỗ Thị Hương	Chánh Văn phòng	0913698454	
HUYỆN HẬU LỘC	XÃ HẬU LỘC	Trần Thị Mỹ Hạnh	Văn thư	02378633339	
HUYỆN HẬU LỘC	XÃ HOA LỘC	Yên Tuấn Hưng	Bí thư Đảng ủy	0907678666	
HUYỆN HẬU LỘC	XÃ HOA LỘC	Nguyễn Ngọc Thành	Phó Bí thư Thường trực Đảng ủy	0912581184	
HUYỆN HẬU LỘC	XÃ HOA LỘC	Ngọ Viết Thắng	Phó Bí thư, Chủ tịch UBND xã	0912026834	
HUYỆN HẬU LỘC	XÃ HOA LỘC	Trần Nguyên Văn	Chánh Văn phòng	0976191974	
HUYỆN HẬU LỘC	XÃ HOA LỘC	Nguyễn Thị Hạnh	Văn thư	0946405936	
HUYỆN HẬU LỘC	XÃ VẠN LỘC	Trương Văn Thuấn	Bí thư Đảng ủy, Chủ tịch HĐND	0983770174	
HUYỆN HẬU LỘC	XÃ VẠN LỘC	Phạm Văn Huỳnh	Phó Bí thư Thường trực Đảng ủy	0945927396	
HUYỆN HẬU LỘC	XÃ VẠN LỘC	Lê Ngọc Hưng	Phó Bí thư, Chủ tịch UBND xã	0946765999	
HUYỆN HẬU LỘC	XÃ VẠN LỘC	Vũ Văn Trung	Chánh Văn phòng	0941872555	
HUYỆN HẬU LỘC	XÃ VẠN LỘC	Nguyễn Thị Vân Anh	Văn thư	0913165638	
HUYỆN HẬU LỘC	XÃ TRIỆU LỘC	Nguyễn Văn Tiến	Bí thư Đảng ủy, Chủ tịch HĐND	0834762585	
HUYỆN HẬU LỘC	XÃ TRIỆU LỘC	Vũ Văn Hoàn	Phó Bí thư Thường trực Đảng ủy	0915674579	
HUYỆN HẬU LỘC	XÃ TRIỆU LỘC	Nguyễn Hùng Việt	Phó Bí thư, Chủ tịch UBND xã	0911565369	
HUYỆN HẬU LỘC	XÃ TRIỆU LỘC	Phạm Văn Bình	Chánh Văn phòng	0971190500	
HUYỆN HẬU LỘC	XÃ TRIỆU LỘC	Phạm Thị Nhung	Văn thư	0983939082	
HUYỆN HẬU LỘC	XÃ ĐÔNG THÀNH	Nguyễn Văn Hùng	Bí thư Đảng ủy, Chủ tịch HĐND	0912311422	
HUYỆN HẬU LỘC	XÃ ĐÔNG THÀNH	Mai Văn Tư	Phó Bí thư Thường trực Đảng ủy	0948923939	
HUYỆN HẬU LỘC	XÃ ĐÔNG THÀNH	Nguyễn Thị Liên	Phó Bí thư, Chủ tịch UBND xã	0942458109	
HUYỆN HẬU LỘC	XÃ ĐÔNG THÀNH	Hoàng Văn Thành	Chánh Văn phòng	0949015009	
HUYỆN HẬU LỘC	XÃ ĐÔNG THÀNH	Nguyễn Thị Thắm	Văn thư	0816782468	
HUYỆN HOẰNG HÓA	XÃ HOẰNG SƠN	Nguyễn Thị Thu Hà	Bí thư Đảng ủy, Chủ tịch HĐND	0914538369	
HUYỆN HOẰNG HÓA	XÃ HOẰNG SƠN	Lưu Đức Trình	Phó Bí thư Thường trực Đảng ủy	0983424786	
HUYỆN HOẰNG HÓA	XÃ HOẰNG SƠN	Lê Trọng Trường	Phó Bí thư, Chủ tịch UBND xã	0913385201	
HUYỆN HOẰNG HÓA	XÃ HOẰNG SƠN	Lê Quang Trình	Chánh Văn phòng	0912925276	
HUYỆN HOẰNG HÓA	XÃ HOẰNG SƠN	Trịnh Thị Nga	Văn thư	0382096730	
HUYỆN HOẰNG HÓA	XÃ HOẰNG HÓA	Lê Thanh Hải	Bí thư Đảng ủy, Chủ tịch HĐND	0912329060	
HUYỆN HOẰNG HÓA	XÃ HOẰNG HÓA	Trịnh Thị Quế	Phó Bí thư Thường trực Đảng ủy	0918325286	
HUYỆN HOẰNG HÓA	XÃ HOẰNG HÓA	Nguyễn Văn Tú	Phó Bí thư, Chủ tịch UBND xã	0912841860	
HUYỆN HOẰNG HÓA	XÃ HOẰNG HÓA	Nguyễn Minh Hùng	Chánh Văn phòng	0942429575	
HUYỆN HOẰNG HÓA	XÃ HOẰNG HÓA	Lê Thị Hằng	Văn thư	0949558970	
HUYỆN HOẰNG HÓA	XÃ HOẰNG HÓA	Lê Thị Lan Hương	Văn thư	0987613968	
HUYỆN HOẰNG HÓA	XÃ HOẰNG GIANG	Hoàng Ngọc Dự	Bí thư Đảng ủy	0915065080	
HUYỆN HOẰNG HÓA	XÃ HOẰNG GIANG	Lê Bá Hải	Phó Bí thư Thường trực Đảng ủy	0914340137	
HUYỆN HOẰNG HÓA	XÃ HOẰNG GIANG	Trần Anh Tuyển	Phó Bí thư, Chủ tịch UBND xã	0833433999	
HUYỆN HOẰNG HÓA	XÃ HOẰNG GIANG	Nguyễn Văn Tài	Chánh Văn phòng	0947113579	
HUYỆN HOẰNG HÓA	XÃ HOẰNG GIANG	Nguyễn Thị Yến	Văn thư	0978318587	
HUYỆN HOẰNG HÓA	XÃ HOẰNG PHÚ	Lê Anh Tuấn	Bí thư Đảng ủy	0919643626	
HUYỆN HOẰNG HÓA	XÃ HOẰNG PHÚ	Nguyễn Minh Hùng	Phó Bí thư Thường trực Đảng ủy	0912179151	
HUYỆN HOẰNG HÓA	XÃ HOẰNG PHÚ	Nguyễn Thị Loan	Phó Bí thư, Chủ tịch UBND xã	0944360119	
HUYỆN HOẰNG HÓA	XÃ HOẰNG PHÚ	Nguyễn Ngọc Lam	Phó Chánh Văn phòng	0978856289	
HUYỆN HOẰNG HÓA	XÃ HOẰNG PHÚ	Lê Thị Nhàn	Văn thư	0918052673	
HUYỆN HOẰNG HÓA	XÃ HOẰNG LỘC	Lê Nguyên Thành	Bí thư Đảng ủy	0984948758	
HUYỆN HOẰNG HÓA	XÃ HOẰNG LỘC	Trần Đức Tuấn	Phó Bí thư Thường trực Đảng ủy	0388500688	
HUYỆN HOẰNG HÓA	XÃ HOẰNG LỘC	Chu Hữu Khuyến	Phó Bí thư, Chủ tịch UBND xã	0898635268	
HUYỆN HOẰNG HÓA	XÃ HOẰNG LỘC	Lê Văn Lâm	Chánh Văn phòng	0985487139	
HUYỆN HOẰNG HÓA	XÃ HOẰNG LỘC	Lê Thị Thủy	Văn thư	0947866538	
HUYỆN HOẰNG HÓA	XÃ HOẰNG CHÂU	Lê Huy Lượng	Bí thư Đảng ủy	0973219756	
HUYỆN HOẰNG HÓA	XÃ HOẰNG CHÂU	Đoàn Đăng Khoa	Phó Bí thư Thường trực Đảng ủy	0965127688	
HUYỆN HOẰNG HÓA	XÃ HOẰNG CHÂU	Chu Văn Đoàn	Phó Bí thư, Chủ tịch UBND xã	0984101768	
HUYỆN HOẰNG HÓA	XÃ HOẰNG CHÂU	Nguyễn Xuân Khởi	Chánh Văn phòng	0977220104	
HUYỆN HOẰNG HÓA	XÃ HOẰNG CHÂU	Lê Thị Hồng	Văn thư	0973419888	
HUYỆN HOẰNG HÓA	XÃ HOẰNG TIẾN	Lê Văn Phúc	Bí thư Đảng ủy, Chủ tịch HĐND	0912472555	
HUYỆN HOẰNG HÓA	XÃ HOẰNG TIẾN	Nguyễn Thị Hà	Phó Bí thư Thường trực đảng ủy	0918568666	
HUYỆN HOẰNG HÓA	XÃ HOẰNG TIẾN	Lê Xuân Hoàn	Phó Bí thư, Chủ tịch UBND xã	0949349925	
HUYỆN HOẰNG HÓA	XÃ HOẰNG TIẾN	Lê Văn Trường	Chánh Văn phòng	0987820012	
HUYỆN HOẰNG HÓA	XÃ HOẰNG TIẾN	Nguyễn Thị Tầm	Văn thư	0348831296	
HUYỆN HOẰNG HÓA	XÃ HOẰNG THANH	Hoàng Văn Dũng	Bí thư Đảng ủy, Chủ tịch HĐND	0968719768	
HUYỆN HOẰNG HÓA	XÃ HOẰNG THANH	Hoàng Hải Thanh	Phó Bí thư Thường trực Đảng ủy	0949081714	
HUYỆN HOẰNG HÓA	XÃ HOẰNG THANH	Nguyễn Văn Tiệm	Phó Bí thư, Chủ tịch UBND xã	0962818688	
HUYỆN HOẰNG HÓA	XÃ HOẰNG THANH	Lê Thị Mão	Phó Chánh Văn phòng	0386153253	
HUYỆN HOẰNG HÓA	XÃ HOẰNG THANH	Lê Thị Thanh	Văn thư	0964769083	
HUYỆN HÀ TRUNG	XÃ HÀ TRUNG	Lê Văn Dậu	Bí thư Đảng ủy, Chủ tịch HĐND	0903441454	
HUYỆN HÀ TRUNG	XÃ HÀ TRUNG	Lê Thị Gấm	Phó Bí thư Thường trực Đảng ủy	0949147090	
HUYỆN HÀ TRUNG	XÃ HÀ TRUNG	Trịnh Hồng Sơn	Phó Bí thư, Chủ tịch UBND xã	0915248343	
HUYỆN HÀ TRUNG	XÃ HÀ TRUNG	Đỗ Văn Vinh	Chánh Văn phòng	0838251555	
HUYỆN HÀ TRUNG	XÃ HÀ TRUNG	Cù Thị Lệ	Văn thư	0946076186	
HUYỆN HÀ TRUNG	XÃ TỐNG SƠN	Nguyễn Xuân Dũng	Bí thư Đảng ủy	0949361916	
HUYỆN HÀ TRUNG	XÃ TỐNG SƠN	Phan Thị Lan	Phó Bí thư Thường trực Đảng ủy	0917502880	
HUYỆN HÀ TRUNG	XÃ TỐNG SƠN	Nguyễn Văn Thịnh	Phó Bí thư, Chủ tịch UBND xã	0915394458	
HUYỆN HÀ TRUNG	XÃ TỐNG SƠN	Đặng Văn Hùng	Chánh Văn phòng	0904300746	
HUYỆN HÀ TRUNG	XÃ TỐNG SƠN	Nguyễn Thị Mến	Văn thư	0393794329	
HUYỆN HÀ TRUNG	XÃ HÀ LONG	Mai Nhữ Thắng	Bí thư Đảng ủy, Chủ tịch HĐND	0911257368	
HUYỆN HÀ TRUNG	XÃ HÀ LONG	Phạm Văn Cường	Phó Bí thư Thường trực Đảng ủy	0835468666	
HUYỆN HÀ TRUNG	XÃ HÀ LONG	Hoàng Anh Tuấn	Phó Bí thư, Chủ tịch UBND xã	0949007682	
HUYỆN HÀ TRUNG	XÃ HÀ LONG	Tống Văn Trưởng	Chánh Văn phòng	0387354279	
HUYỆN HÀ TRUNG	XÃ HÀ LONG	Trần Thị Thúy	Văn thư	0399370035	
HUYỆN HÀ TRUNG	XÃ HOẠT GIANG	Vũ Xuân Hóa	Bí thư Đảng ủy	0919512786	
HUYỆN HÀ TRUNG	XÃ HOẠT GIANG	Tống Thị Duyên	Phó Bí thư Thường trực Đảng ủy	0914775580	
HUYỆN HÀ TRUNG	XÃ HOẠT GIANG	Phùng Tiến Dũng	Phó Bí thư, Chủ tịch UBND xã	0918219111	
HUYỆN HÀ TRUNG	XÃ HOẠT GIANG	Đặng Văn Khương	Chánh Văn phòng	0947809222	
HUYỆN HÀ TRUNG	XÃ HOẠT GIANG	Trịnh Thị Phương	Văn thư	0839688931	
HUYỆN HÀ TRUNG	XÃ LĨNH TOẠI	Hoàng Văn Long	Bí thư Đảng ủy	0918059168	
HUYỆN HÀ TRUNG	XÃ LĨNH TOẠI	Vũ Xuân Thu	Phó Bí thư Thường trực Đảng ủy	0914135116	
HUYỆN HÀ TRUNG	XÃ LĨNH TOẠI	Hoàng Huy Tự	Phó Bí thư, Chủ tịch UBND xã	0912083868	
HUYỆN HÀ TRUNG	XÃ LĨNH TOẠI	Vũ Đức Hùng	Chánh Văn phòng	0989704488	
HUYỆN HÀ TRUNG	XÃ LĨNH TOẠI	Trần Thị Dung	Văn thư	0943931088	
HUYỆN QUẢNG XƯƠNG	XÃ LƯU VỆ	Nguyễn Minh Hoàng	Bí thư Đảng ủy	0938568999	
HUYỆN QUẢNG XƯƠNG	XÃ LƯU VỆ	Phùng Tố Linh	Phó Bí thư Thường trực Đảng ủy	0913810118	
HUYỆN QUẢNG XƯƠNG	XÃ LƯU VỆ	Đỗ Trí Hòa	Phó Bí thư, Chủ tịch UBND xã	0916143368	
HUYỆN QUẢNG XƯƠNG	XÃ LƯU VỆ	Phạm Mạnh Tùng	Chánh Văn phòng	0962375985	
HUYỆN QUẢNG XƯƠNG	XÃ LƯU VỆ	Lê Thị Yến	Văn thư	0344012841	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG YÊN	Nguyễn Huy Nam	Bí thư Đảng ủy, Chủ tịch HĐND	0988123999	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG YÊN	Nguyễn Hồng Anh	Phó Bí thư Thường trực Đảng ủy	0973347156	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG YÊN	Mai Đình Thủy	Phó Bí thư, Chủ tịch UBND xã	0919592999	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG YÊN	Ngô Tiến Hải	Chánh Văn phòng	0835600678	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG YÊN	Đặng Văn Hoàng	Văn thư	0919805836	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG BÌNH	Phạm Thị Mai	Bí thư Đảng ủy	0914932856	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG BÌNH	Nguyễn Huy Nam	Phó Bí thư Thường trực Đảng ủy	0912604886	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG BÌNH	Trịnh Thị Nguyên	Phó Bí thư, Chủ tịch UBND xã	0942134767	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG BÌNH	Phạm Sỹ Ba	Chánh Văn phòng	0912784356	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG BÌNH	Lê Văn Mạnh	Văn thư	0977476663	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG NINH	Nguyễn Thị Sơn	Bí thư Đảng ủy, Chủ tịch HĐND	0983150498	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG NINH	Nguyễn Thị Hòa	Phó Bí thư Thường trực Đảng ủy	0982515368	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG NINH	Nguyễn Bá Tài	Phó Bí thư, Chủ tịch UBND xã	0982969552	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG NINH	Lữ Trọng Chung	Chánh Văn phòng	0948380460	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG NINH	Nguyễn Thị Huyền Trang	Văn thư	0965211388	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG NGỌC	Lê Như Tuấn	Bí thư Đảng ủy, Chủ tịch HĐND	0983269496	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG NGỌC	Lê Phương Huyền	Phó Bí thư Thường trực Đảng ủy	0912602702	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG NGỌC	Lê Như Nam	Phó Bí thư, Chủ tịch UBND xã	0962086826	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG NGỌC	Nguyễn Thị Chung	Chánh Văn phòng	0975386536	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG NGỌC	Nguyễn Thị Hiền	Văn thư	0972078219	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG CHÍNH	Đỗ Đình Cường	Bí thư Đảng ủy	0986397595	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG CHÍNH	Văn Doãn Hùng	Phó Bí thư Thường trực Đảng ủy	0977467333	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG CHÍNH	Lê Đại Hiệp	Phó Bí thư, Chủ tịch UBND xã	0912605629	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG CHÍNH	Hoàng Công Thuỷ	Chánh Văn phòng	0988448823	
HUYỆN QUẢNG XƯƠNG	XÃ QUẢNG CHÍNH	Nguyễn Văn Tình	Văn thư	0979296811	
HUYỆN QUẢNG XƯƠNG	XÃ TIÊN TRANG	Đặng Ngọc Thanh	Bí thư Đảng ủy, Chủ tịch HĐND	0932517555	
HUYỆN QUẢNG XƯƠNG	XÃ TIÊN TRANG	Hoàng Bùi Sơn	Phó Bí thư Thường trực Đảng ủy	0986604418	
HUYỆN QUẢNG XƯƠNG	XÃ TIÊN TRANG	Trần Thị Huệ	Phó Bí thư, Chủ tịch UBND xã	0943416545	
HUYỆN QUẢNG XƯƠNG	XÃ TIÊN TRANG	Nguyễn Huy Tú	Chánh Văn phòng	0977110581	
HUYỆN QUẢNG XƯƠNG	XÃ TIÊN TRANG	Mai Thị Xoan	Văn thư	0912300128	
HUYỆN NÔNG CỐNG	XÃ NÔNG CỐNG	Võ Mạnh Sơn	Bí thư Đảng ủy, Chủ tịch HĐND	0918581998	
HUYỆN NÔNG CỐNG	XÃ NÔNG CỐNG	Trương Công Tuấn	Phó Bí thư Thường trực Đảng ủy	0912202138	
HUYỆN NÔNG CỐNG	XÃ NÔNG CỐNG	Đồng Minh Quân	Phó Bí thư, Chủ tịch UBND xã	0988208288	
HUYỆN NÔNG CỐNG	XÃ NÔNG CỐNG	Nguyễn Văn Ba	Chánh Văn phòng	0934624123	
HUYỆN NÔNG CỐNG	XÃ NÔNG CỐNG	Lê Thị Trúc	Văn thư	0943043292	
HUYỆN NÔNG CỐNG	XÃ THĂNG BÌNH	Nguyễn Hải Đức	Bí thư Đảng ủy	0913293811	
HUYỆN NÔNG CỐNG	XÃ THĂNG BÌNH	Đỗ Gia Xuân	Phó Bí thư Thường trực Đảng ủy	0945262929	
HUYỆN NÔNG CỐNG	XÃ THĂNG BÌNH	Nguyễn Thái Sơn	Phó Bí thư, Chủ tịch UBND xã	0918054595	
HUYỆN NÔNG CỐNG	XÃ THĂNG BÌNH	Cao Văn Phong	Chánh Văn phòng	0918053826	
HUYỆN NÔNG CỐNG	XÃ THĂNG BÌNH	Lê Thị Nhàn	Văn thư	0978645612	
HUYỆN NÔNG CỐNG	XÃ TRUNG CHÍNH	Lê Quang Quyền	Bí thư Đảng ủy, Chủ tịch HĐND	0946858008	
HUYỆN NÔNG CỐNG	XÃ TRUNG CHÍNH	Cao Văn Dũng	Phó Bí thư Thường trực Đảng ủy	0917716858	
HUYỆN NÔNG CỐNG	XÃ TRUNG CHÍNH	Nguyễn Hồng Điệp	Phó Bí thư, Chủ tịch UBND xã	0977665868	
HUYỆN NÔNG CỐNG	XÃ TRUNG CHÍNH	Nguyễn Bá Hợi	Chánh Văn phòng	0987428993	
HUYỆN NÔNG CỐNG	XÃ TRUNG CHÍNH	Lê Thị Hà	Văn thư	0972873328	
HUYỆN NÔNG CỐNG	XÃ THẮNG LỢI	Nguyễn Giang Nam	Bí thư Đảng ủy	0981181909	
HUYỆN NÔNG CỐNG	XÃ THẮNG LỢI	Trần Thị Kiên	Phó Bí thư Thường trực Đảng ủy	0913603029	
HUYỆN NÔNG CỐNG	XÃ THẮNG LỢI	Lê Anh Tuấn	Phó Bí thư, Chủ tịch UBND xã	0843937199	
HUYỆN NÔNG CỐNG	XÃ THẮNG LỢI	Lê Văn Xuân	Chánh văn phòng HĐND và UBND	0974149689	
HUYỆN NÔNG CỐNG	XÃ THẮNG LỢI	Trần Đức Tiến	Văn thư	0977880179	
HUYỆN NÔNG CỐNG	XÃ TRƯỜNG VĂN	Nguyễn Đức Long	Bí thư Đảng ủy	0916042999	
HUYỆN NÔNG CỐNG	XÃ TRƯỜNG VĂN	Nguyễn Ngọc Sơn	Phó Bí thư Thường trực Đảng ủy	0915485468	
HUYỆN NÔNG CỐNG	XÃ TRƯỜNG VĂN	Lê Ngọc Thắng	Phó Bí thư, Chủ tịch UBND xã	0912538031	
HUYỆN NÔNG CỐNG	XÃ TRƯỜNG VĂN	Trần Ngọc Hoàng	Chánh Văn phòng	0901740555	
HUYỆN NÔNG CỐNG	XÃ TRƯỜNG VĂN	Trịnh Thị Xuân	Văn thư	0986207425	
HUYỆN NÔNG CỐNG	XÃ TƯỢNG LĨNH	Lê Đình Trang	Bí thư Đảng ủy	0989091006	
HUYỆN NÔNG CỐNG	XÃ TƯỢNG LĨNH	Nguyễn Thị Hải	Phó Bí thư Thường trực Đảng ủy	0961892368	
HUYỆN NÔNG CỐNG	XÃ TƯỢNG LĨNH	Nguyễn Hữu Hà	Phó Bí thư, Chủ tịch UBND xã	0936218516	
HUYỆN NÔNG CỐNG	XÃ TƯỢNG LĨNH	Nguyễn Thế Diện	Chánh Văn phòng	0989908025	
HUYỆN NÔNG CỐNG	XÃ TƯỢNG LĨNH	Nguyễn Thị Bắc	Văn thư	0982103945	
HUYỆN NÔNG CỐNG	XÃ CÔNG CHÍNH	Lương Minh Hùng	Bí thư Đảng ủy	0912876515	
HUYỆN NÔNG CỐNG	XÃ CÔNG CHÍNH	Phạm Thị Đính	Phó Bí thư Thường trực Đảng ủy	0975869882	
HUYỆN NÔNG CỐNG	XÃ CÔNG CHÍNH	Nguyễn Trung Kiên	Phó Bí thư, Chủ tịch UBND xã	0886182888	
HUYỆN NÔNG CỐNG	XÃ CÔNG CHÍNH	Nguyễn Văn Thành	Chánh Văn phòng	0919359616	
HUYỆN NÔNG CỐNG	XÃ CÔNG CHÍNH	Lê Thị Thương	Văn thư	0945337728	
HUYỆN TRIỆU SƠN	XÃ TRIỆU SƠN	Phạm Nguyên Hồng	Bí thư Đảng ủy	0985210222	
HUYỆN TRIỆU SƠN	XÃ TRIỆU SƠN	Lê Quang Trung	Phó Bí thư Thường trực Đảng ủy	0913253567	
HUYỆN TRIỆU SƠN	XÃ TRIỆU SƠN	Vũ Văn Ba	Phó Bí thư, Chủ tịch UBND xã	0904557090	
HUYỆN TRIỆU SƠN	XÃ TRIỆU SƠN	Trịnh Công Nguyên	Chánh Văn phòng	0986264643	
HUYỆN TRIỆU SƠN	XÃ TRIỆU SƠN	Lê Thị Nga	Văn thư	0399281985	
HUYỆN TRIỆU SƠN	XÃ THỌ PHÚ	Lê Tiến Dũng	Bí thư Đảng ủy, Chủ tịch HĐND	0918371082	
HUYỆN TRIỆU SƠN	XÃ THỌ PHÚ	Bùi Huy Dũng	Phó Bí thư Thường trực Đảng ủy	0912766177	
HUYỆN TRIỆU SƠN	XÃ THỌ PHÚ	Nguyễn Trung Thành	Phó Bí thư, Chủ tịch UBND xã	0912384106	
HUYỆN TRIỆU SƠN	XÃ THỌ PHÚ	Lê Văn Tú	Chánh Văn phòng	0973220898	
HUYỆN TRIỆU SƠN	XÃ THỌ PHÚ	Lê Thị Hải	Văn thư	0988258650	
HUYỆN TRIỆU SƠN	XÃ TÂN NINH	Nguyễn Thành Luân	Bí thư Đảng ủy	0912622475	
HUYỆN TRIỆU SƠN	XÃ TÂN NINH	Quản Trọng Thể	Phó Bí thư Thường trực Đảng ủy	0904169319	
HUYỆN TRIỆU SƠN	XÃ TÂN NINH	Nông Bá Dũng	Phó Bí thư, Chủ tịch UBND xã	0772206176	
HUYỆN TRIỆU SƠN	XÃ TÂN NINH	Lê Minh Hải	Chánh Văn phòng	0904717170	
HUYỆN TRIỆU SƠN	XÃ TÂN NINH	Lê Thị Hợi	Văn thư	0889658345	
HUYỆN TRIỆU SƠN	XÃ ĐỒNG TIẾN	Đỗ Hữu Quyết	Bí thư Đảng ủy	0819778666	
HUYỆN TRIỆU SƠN	XÃ ĐỒNG TIẾN	Lê Xuân Trường	Phó Bí thư Thường trực Đảng ủy	0912383732	
HUYỆN TRIỆU SƠN	XÃ ĐỒNG TIẾN	Phạm Văn Thường	Phó Bí thư, Chủ tịch UBND xã	0912715739	
HUYỆN TRIỆU SƠN	XÃ ĐỒNG TIẾN	Lê Văn Thương	Chánh Văn phòng	0982445380	
HUYỆN TRIỆU SƠN	XÃ ĐỒNG TIẾN	Lê Thị Lan	Văn thư	0975703913	
HUYỆN TRIỆU SƠN	XÃ HỢP TIẾN	Lê Phú Quốc	Bí thư Đảng ủy, Chủ tịch HĐND	0936409286	
HUYỆN TRIỆU SƠN	XÃ HỢP TIẾN	Lê Thị Độ	Phó Bí thư Thường trực Đảng ủy	0915096486	
HUYỆN TRIỆU SƠN	XÃ HỢP TIẾN	Nguyễn Thị Xuân	Phó Bí thư, Chủ tịch UBND xã	0936267892	
HUYỆN TRIỆU SƠN	XÃ HỢP TIẾN	Lê Văn Tâm	Chánh Văn phòng	0989478416	
HUYỆN TRIỆU SƠN	XÃ HỢP TIẾN	Lê Thị Huệ	Văn thư	0385506864	
HUYỆN TRIỆU SƠN	XÃ THỌ NGỌC	Lê Thị Sen	Bí thư Đảng ủy, Chủ tịch HĐND	0915412917	
HUYỆN TRIỆU SƠN	XÃ THỌ NGỌC	Lê Ngọc Toàn	Phó Bí thư Thường trực Đảng ủy	0916366456	
HUYỆN TRIỆU SƠN	XÃ THỌ NGỌC	Nguyễn Ngọc Quang	Phó Bí thư, Chủ tịch UBND xã	0945138338	
HUYỆN TRIỆU SƠN	XÃ THỌ NGỌC	Đỗ Đình Khánh	Chánh Văn phòng	0979191582	
HUYỆN TRIỆU SƠN	XÃ THỌ NGỌC	Trịnh Thị Luận	Văn thư	0969463788	
HUYỆN TRIỆU SƠN	XÃ AN NÔNG	Nguyễn Việt Ba	Bí thư Đảng ủy, Chủ tịch HĐND	0904815555	
HUYỆN TRIỆU SƠN	XÃ AN NÔNG	Hà Thị Thủy	Phó Bí thư Thường trực Đảng ủy	0971992915	
HUYỆN TRIỆU SƠN	XÃ AN NÔNG	Hoàng Vũ Thảo	Phó Bí thư, Chủ tịch UBND xã	0939751985	
HUYỆN TRIỆU SƠN	XÃ AN NÔNG	Mai Thị Hà	Chánh Văn phòng	0942979109	
HUYỆN TRIỆU SƠN	XÃ AN NÔNG	Nguyễn Thị Huệ	Văn thư	0914746636	
HUYỆN TRIỆU SƠN	XÃ AN NÔNG	Chu Thị Phượng	Văn thư	0975023084	
HUYỆN TRIỆU SƠN	XÃ THỌ BÌNH	Nguyễn Hùng Vương	Bí thư Đảng ủy	0941686136	
HUYỆN TRIỆU SƠN	XÃ THỌ BÌNH	Lê Văn Phương	Phó Bí thư Thường trực Đảng ủy	0989847398	
HUYỆN TRIỆU SƠN	XÃ THỌ BÌNH	Hoàng Văn Chung	Phó Bí thư, Chủ tịch UBND xã	0946512626	
HUYỆN TRIỆU SƠN	XÃ THỌ BÌNH	Bùi Thị Hồng	Chánh Văn phòng	0867574218	
HUYỆN TRIỆU SƠN	XÃ THỌ BÌNH	Nguyễn Thị Thuận	Văn thư	0964631869	
HUYỆN THỌ XUÂN	XÃ SAO VÀNG	Mai Văn Hải	Bí thư Đảng ủy, Chủ tịch HĐND	0966248866	
HUYỆN THỌ XUÂN	XÃ SAO VÀNG	Phan Thanh Dũng	Phó Bí thư Thường trực Đảng ủy	0983620456	
HUYỆN THỌ XUÂN	XÃ SAO VÀNG	Nguyễn Quốc Tuấn	Phó Bí thư, Chủ tịch UBND xã	0912456536	
HUYỆN THỌ XUÂN	XÃ SAO VÀNG	Ngô Khắc Giang	Chánh Văn phòng	0983797891	
HUYỆN THỌ XUÂN	XÃ SAO VÀNG	Trịnh Thị Hường	Văn thư	0978985881	
HUYỆN THỌ XUÂN	XÃ THỌ LẬP	Nguyễn Trường Sinh	Bí thư Đảng ủy	0989792829	
HUYỆN THỌ XUÂN	XÃ THỌ LẬP	Lê Văn Lực	Phó Bí thư Thường trực Đảng ủy	0948378036	
HUYỆN THỌ XUÂN	XÃ THỌ LẬP	Trịnh Duy Tình	Phó Bí thư, Chủ tịch UBND xã	0966200156	
HUYỆN THỌ XUÂN	XÃ THỌ LẬP	Trần Thị Thực	Chánh Văn phòng	0356097289	
HUYỆN THỌ XUÂN	XÃ THỌ LẬP	Nguyễn Thị Nga	Văn thư	0396933613	
HUYỆN THỌ XUÂN	XÃ THỌ XUÂN	Thái Xuân Cường	Bí thư Đảng ủy	0912980678	
HUYỆN THỌ XUÂN	XÃ THỌ XUÂN	Lê Thị Thanh Tâm	Phó Bí thư Thường trực Đảng ủy	0948502911	
HUYỆN THỌ XUÂN	XÃ THỌ XUÂN	Lê Ngọc Quân	Phó Bí thư, Chủ tịch UBND xã	0918227656	
HUYỆN THỌ XUÂN	XÃ THỌ XUÂN	Lê Ngọc Hòa	Chánh Văn phòng	0969513668	
HUYỆN THỌ XUÂN	XÃ THỌ XUÂN	Lê Thị Quỳnh Mai	Văn thư	0919850567	
HUYỆN THỌ XUÂN	XÃ XUÂN LẬP	Lí Đình Sĩ	Bí thư Đảng ủy	0989792829	
HUYỆN THỌ XUÂN	XÃ XUÂN LẬP	Đỗ Kim Thọ	Phó Bí thư Thường trực Đảng ủy	0898615679	
HUYỆN THỌ XUÂN	XÃ XUÂN LẬP	Hoàng Vũ Thạo	Phó Bí thư, Chủ tịch UBND xã	0986130067	
HUYỆN THỌ XUÂN	XÃ XUÂN LẬP	Hoàng Huy Bắc	Chánh Văn phòng	0348785567	
HUYỆN THỌ XUÂN	XÃ XUÂN LẬP	Trịnh Anh Ngọc	Văn thư	0976258936	
HUYỆN THỌ XUÂN	XÃ THỌ LONG	Nguyễn Hữu Dũng	Bí thư Đảng ủy, Chủ tịch HĐND	0964714666	
HUYỆN THỌ XUÂN	XÃ THỌ LONG	Lê Kiều Anh	Phó Bí thư Thường trực Đảng ủy	0919013868	
HUYỆN THỌ XUÂN	XÃ THỌ LONG	Lưu Thị Anh Đào	Phó Bí thư, Chủ tịch UBND xã	0984865234	
HUYỆN THỌ XUÂN	XÃ THỌ LONG	Đỗ Thị Thúy	Chánh Văn phòng	0918327656	
HUYỆN THỌ XUÂN	XÃ THỌ LONG	Lê Thị Hoa	Văn thư	0392599614	
HUYỆN THỌ XUÂN	XÃ XUÂN HÒA	Phạm Văn Luận	Bí thư Đảng ủy	0969891977	
HUYỆN THỌ XUÂN	XÃ XUÂN HÒA	Nguyễn Thị Bích Phương	Phó Bí thư Thường trực Đảng ủy	0915845888	
HUYỆN THỌ XUÂN	XÃ XUÂN HÒA	Trịnh Ngọc Giang	Phó Bí thư, Chủ tịch UBND xã	0916205113	
HUYỆN THỌ XUÂN	XÃ XUÂN HÒA	Đỗ Mạnh Hùng	Chánh Văn phòng	0963980678	
HUYỆN THỌ XUÂN	XÃ XUÂN HÒA	Ngô Thị Tuyết	Văn thư	0902167135	
HUYỆN THỌ XUÂN	XÃ LAM SƠN	Phạm Ngọc Thức	Bí thư Đảng ủy, Chủ tịch HĐND	0919767558	
HUYỆN THỌ XUÂN	XÃ LAM SƠN	Phạm Thanh Tùng	Phó Bí thư Thường trực Đảng ủy	0978889173	
HUYỆN THỌ XUÂN	XÃ LAM SƠN	Lê Văn Niệm	Phó Bí thư, Chủ tịch UBND xã	0915666236	
HUYỆN THỌ XUÂN	XÃ LAM SƠN	Nguyễn Thị Nụ	Chánh Văn phòng	0906189332	
HUYỆN THỌ XUÂN	XÃ LAM SƠN	Lê Thị Dung	Văn thư	0374551354	
HUYỆN THỌ XUÂN	XÃ XUÂN TÍN	Nguyễn Xuân Hải	Bí thư Đảng ủy	0942873636	
HUYỆN THỌ XUÂN	XÃ XUÂN TÍN	Trịnh Ngọc Tấn	Phó Bí thư Thường trực Đảng ủy	0985006955	
HUYỆN THỌ XUÂN	XÃ XUÂN TÍN	Vũ Văn Đông	Phó Bí thư, Chủ tịch UBND xã	0935888868	
HUYỆN THỌ XUÂN	XÃ XUÂN TÍN	Nguyễn Thị Nga	Chánh Văn phòng	0966546386	
HUYỆN THỌ XUÂN	XÃ XUÂN TÍN	Phan Thị Hoa	Văn thư	0981950790	
HUYỆN THIỆU HÓA	XÃ THIỆU HÓA	Nguyễn Trọng Trang	Bí thư Đảng ủy, Chủ tịch HĐND	0988345088	
HUYỆN THIỆU HÓA	XÃ THIỆU HÓA	Lê Minh Sơn	Phó Bí thư Thường trực Đảng ủy	0913293557	
HUYỆN THIỆU HÓA	XÃ THIỆU HÓA	Nguyễn Ngọc Hiểu	Phó Bí thư, Chủ tịch UBND xã	0936567399	
HUYỆN THIỆU HÓA	XÃ THIỆU HÓA	Nguyễn Thị Hà	Chánh Văn phòng	0963719636	
HUYỆN THIỆU HÓA	XÃ THIỆU HÓA	Cao Thị Hường	Văn thư	0328071618	
HUYỆN THIỆU HÓA	XÃ THIỆU TRUNG	Đỗ Thế Bằng	Bí thư Đảng ủy, Chủ tịch HĐND	0912176847	
HUYỆN THIỆU HÓA	XÃ THIỆU TRUNG	Nguyễn Văn Phúc	Phó Bí thư Thường trực Đảng ủy	0984902083	
HUYỆN THIỆU HÓA	XÃ THIỆU TRUNG	Trịnh Đình Tùng	Phó Bí thư, Chủ tịch UBND xã	0916995966	
HUYỆN THIỆU HÓA	XÃ THIỆU TRUNG	Trương Trọng Bắc	Chánh Văn phòng	0912553394	
HUYỆN THIỆU HÓA	XÃ THIỆU TRUNG	Lê Minh Thành	Văn thư	0977619055	
HUYỆN THIỆU HÓA	XÃ THIỆU TOÁN	Đỗ Ngọc Luân	Bí thư Đảng ủy	0912605085	
HUYỆN THIỆU HÓA	XÃ THIỆU TOÁN	Bùi Trung Hiếu	Phó Bí thư Thường trực Đảng ủy	0915244240	
HUYỆN THIỆU HÓA	XÃ THIỆU TOÁN	Trịnh Đức Hùng	Phó Bí thư, Chủ tịch UBND xã	0984798702	
HUYỆN THIỆU HÓA	XÃ THIỆU TOÁN	Lê Công Cường	Chánh Văn phòng	0983118371	
HUYỆN THIỆU HÓA	XÃ THIỆU TOÁN	Nguyễn Thị Hồng	Văn thư	0396832428	
HUYỆN THIỆU HÓA	XÃ THIỆU TIẾN	Lê Viết Chí	Bí thư Đảng ủy	0945385898	
HUYỆN THIỆU HÓA	XÃ THIỆU TIẾN	Nguyễn Thị Thu	Phó Bí thư Thường trực Đảng ủy	0979768656	
HUYỆN THIỆU HÓA	XÃ THIỆU TIẾN	Phan Anh Tiến	Phó Bí thư, Chủ tịch UBND xã	0918683909	
HUYỆN THIỆU HÓA	XÃ THIỆU TIẾN	Nguyễn Văn Thắng	Chánh Văn phòng	0975527333	
HUYỆN THIỆU HÓA	XÃ THIỆU TIẾN	Lê Thị Dung	Văn thư	0337869414	
HUYỆN THIỆU HÓA	XÃ THIỆU QUANG	Hoàng Trọng Cường	Bí thư Đảng ủy	0949014568	
HUYỆN THIỆU HÓA	XÃ THIỆU QUANG	Nguyễn Quang Thọ	Phó Bí thư Thường trực Đảng ủy	0985616856	
HUYỆN THIỆU HÓA	XÃ THIỆU QUANG	Trịnh Hà Hoàng Linh	Phó Bí thư, Chủ tịch UBND xã	0972124789	
HUYỆN THIỆU HÓA	XÃ THIỆU QUANG	Lê Văn Tiến	Chánh Văn phòng	0987205998	
HUYỆN THIỆU HÓA	XÃ THIỆU QUANG	Đỗ Viết Hùng	Văn thư	0824461456	
HUYỆN YÊN ĐỊNH	Xã Yên Định	Lê Minh Nghĩa	Bí thư Đảng ủy	0902605559	
HUYỆN YÊN ĐỊNH	Xã Yên Định	Trịnh Lê Thủy	Phó Bí thư Thường trực Đảng ủy	0918663589	
HUYỆN YÊN ĐỊNH	Xã Yên Định	Nguyễn Đăng Trường	Phó Bí thư, Chủ tịch UBND xã	0901142555	
HUYỆN YÊN ĐỊNH	Xã Yên Định	Trịnh Thị Ngọc Lan	Q. Chánh Văn phòng	0987984373	
HUYỆN YÊN ĐỊNH	Xã Yên Định	Cao Thị Hoa	Văn thư	0974337018	
HUYỆN YÊN ĐỊNH	XÃ YÊN TRƯỜNG	Trịnh Văn Thể	Bí thư Đảng ủy, Chủ tịch HĐND	0983513969	
HUYỆN YÊN ĐỊNH	XÃ YÊN TRƯỜNG	Nguyễn Đăng Huệ	Phó Bí thư Thường trực Đảng ủy	0931959468	
HUYỆN YÊN ĐỊNH	XÃ YÊN TRƯỜNG	Nguyễn Ngọc Nam	Phó Bí thư, Chủ tịch UBND xã	0904361774	
HUYỆN YÊN ĐỊNH	XÃ YÊN TRƯỜNG	Lại Khắc Linh	Chánh Văn phòng	0975451915	
HUYỆN YÊN ĐỊNH	XÃ YÊN TRƯỜNG	Trịnh Thị Loan	Văn thư	0353493931	
HUYỆN YÊN ĐỊNH	XÃ YÊN PHÚ	Nguyễn Xuân Tùng	Bí thư Đảng ủy	0915040908	
HUYỆN YÊN ĐỊNH	XÃ YÊN PHÚ	Nguyễn Văn Hiếu	Phó Bí thư Thường trực Đảng ủy	0858927789	
HUYỆN YÊN ĐỊNH	XÃ YÊN PHÚ	Nguyễn Đăng Ngọc	Phó Bí thư, Chủ tịch UBND xã	0943897776	
HUYỆN YÊN ĐỊNH	XÃ YÊN PHÚ	Lê Trung Nguyên	Phó Chánh Văn phòng	0985049554	
HUYỆN YÊN ĐỊNH	XÃ YÊN PHÚ	Nguyễn Thị Thu Hiền	Văn thư	0915742116	
HUYỆN YÊN ĐỊNH	XÃ QUÝ LỘC	Đặng Văn Hiệp	Bí thư Đảng ủy	0984865956	
HUYỆN YÊN ĐỊNH	XÃ QUÝ LỘC	Lê Xuân Trường	Phó Bí thư Thường trực Đảng ủy	0989804568	
HUYỆN YÊN ĐỊNH	XÃ QUÝ LỘC	Nguyễn Văn Hiếu	Phó Bí thư, Chủ tịch UBND xã	0931351789	
HUYỆN YÊN ĐỊNH	XÃ QUÝ LỘC	Lưu Hải Chuyền	Chánh Văn phòng	0973948768	
HUYỆN YÊN ĐỊNH	XÃ QUÝ LỘC	Nguyễn Tú Anh	Văn thư	0976834313	
HUYỆN YÊN ĐỊNH	XÃ YÊN NINH	Hoàng Trung Hưng	Bí thư Đảng ủy	0912602428	
HUYỆN YÊN ĐỊNH	XÃ YÊN NINH	Hoàng Văn Đông	Phó Bí thư Thường trực Đảng ủy	0904169400	
HUYỆN YÊN ĐỊNH	XÃ YÊN NINH	Trịnh Thanh Bình	Phó Bí thư, Chủ tịch UBND xã	0904508367	
HUYỆN YÊN ĐỊNH	XÃ YÊN NINH	Lê Ngọc Mạnh	Chánh Văn phòng	0987958289	
HUYỆN YÊN ĐỊNH	XÃ YÊN NINH	Nguyễn Thị Hường	Văn thư	0974559069	
HUYỆN YÊN ĐỊNH	XÃ ĐỊNH TÂN	Vũ Ngọc Thưởng	Bí thư Đảng ủy, Chủ tịch HĐND	0903468316	
HUYỆN YÊN ĐỊNH	XÃ ĐỊNH TÂN	Lê Văn Thanh	Phó Bí thư Thường trực Đảng ủy	0948723999	
HUYỆN YÊN ĐỊNH	XÃ ĐỊNH TÂN	Hoàng Văn Tiến	Phó Bí thư, Chủ tịch UBND xã	0913283234	
HUYỆN YÊN ĐỊNH	XÃ ĐỊNH TÂN	Lê Văn Toàn	Chánh Văn phòng	0961070573	
HUYỆN YÊN ĐỊNH	XÃ ĐỊNH TÂN	Lê Thị Hường	Văn thư	0973398886	
HUYỆN YÊN ĐỊNH	XÃ ĐỊNH HÒA	Lê Đức Thọ	Bí thư Đảng ủy	0904449133	
HUYỆN YÊN ĐỊNH	XÃ ĐỊNH HÒA	Lê Thị Thúy	Phó Bí thư Thường trực Đảng ủy	0975725838	
HUYỆN YÊN ĐỊNH	XÃ ĐỊNH HÒA	Lê Văn Cường	Phó Bí thư, Chủ tịch UBND xã	0964084598	
HUYỆN YÊN ĐỊNH	XÃ ĐỊNH HÒA	Trần Đức Nghĩa	Chánh Văn phòng	0984633532	
HUYỆN YÊN ĐỊNH	XÃ ĐỊNH HÒA	Phạm Thị Dung	Văn thư	0815402888	
HUYỆN VĨNH LỘC	XÃ VĨNH LỘC	Trần Văn Tuấn	Bí thư Đảng ủy, Chủ tịch HĐND	0982762036	
HUYỆN VĨNH LỘC	XÃ VĨNH LỘC	Bùi Thị Cẩm Tú	Phó Bí thư Thường trực Đảng ủy	0387362180	
HUYỆN VĨNH LỘC	XÃ VĨNH LỘC	Trịnh Ngọc Tuân	Phó Bí thư, Chủ tịch UBND xã	0946607003	
HUYỆN VĨNH LỘC	XÃ VĨNH LỘC	Trịnh Đình Trường	Chánh Văn phòng	0949015499	
HUYỆN VĨNH LỘC	XÃ VĨNH LỘC	Phạm Thị Hà	Văn thư	0989737459	
HUYỆN VĨNH LỘC	XÃ TÂY ĐÔ	Lê Văn Tịnh	Bí thư Đảng ủy, Chủ tịch HĐND	0912958812	
HUYỆN VĨNH LỘC	XÃ TÂY ĐÔ	Vũ Anh Tuấn	Phó Bí thư Thường trực Đảng ủy	0914238811	
HUYỆN VĨNH LỘC	XÃ TÂY ĐÔ	Trịnh Xuân Thắng	Phó Bí thư, Chủ tịch UBND xã	0986966882	
HUYỆN VĨNH LỘC	XÃ TÂY ĐÔ	Phạm Doãn Mẫn	Chánh Văn phòng	0984838676	
HUYỆN VĨNH LỘC	XÃ TÂY ĐÔ	Nguyễn Thị Ngọc	Văn thư	0968859618	
HUYỆN VĨNH LỘC	XÃ BIỆN THƯỢNG	Phạm Quốc Thành	Bí thư Đảng ủy, Chủ tịch HĐND xã	0904939678	
HUYỆN VĨNH LỘC	XÃ BIỆN THƯỢNG	Vũ Đình Việt	Phó Bí thư Thường trực Đảng ủy	0915394895	
HUYỆN VĨNH LỘC	XÃ BIỆN THƯỢNG	Nguyễn Văn Hùng	Phó Bí thư, Chủ tịch UBND xã	0945668678	
HUYỆN VĨNH LỘC	XÃ BIỆN THƯỢNG	Trần Xuân Tùng	Chánh Văn phòng	0975856858	
HUYỆN VĨNH LỘC	XÃ BIỆN THƯỢNG	Trịnh Thị Phương	Văn thư	0853921800	
HUYỆN THẠCH THÀNH	XÃ KIM TÂN	Đinh Văn Hưng	Bí thư Đảng ủy, Chủ tịch HĐND xã	0915597630	
HUYỆN THẠCH THÀNH	XÃ KIM TÂN	Bùi Thị Định	Phó Bí thư Thường trực Đảng ủy	0948109175	
HUYỆN THẠCH THÀNH	XÃ KIM TÂN	Nguyễn Thanh Hào	Phó Bí thư, Chủ tịch UBND xã	0904542567	
HUYỆN THẠCH THÀNH	XÃ KIM TÂN	Lê Văn Dũng	Chánh Văn phòng	0888788558	
HUYỆN THẠCH THÀNH	XÃ KIM TÂN	Lê Thị Nhung	Văn thư	0949160369	
HUYỆN THẠCH THÀNH	XÃ VÂN DU	Lê Sỹ Nghiêm	Bí thư Đảng ủy	0979969266	
HUYỆN THẠCH THÀNH	XÃ VÂN DU	Hoàng Thị Vân Anh	Phó Bí thư Thường trực Đảng ủy	0932397369	
HUYỆN THẠCH THÀNH	XÃ VÂN DU	Lê Thị Hoa	Phó Bí thư, Chủ tịch UBND xã	0948131316	
HUYỆN THẠCH THÀNH	XÃ VÂN DU	Lê Ngọc Hội	Phó Chánh Văn phòng	0827739113	
HUYỆN THẠCH THÀNH	XÃ VÂN DU	Nguyễn Đình Tứ	Văn thư	0944965078	
HUYỆN THẠCH THÀNH	XÃ NGỌC TRẠO	Lê Xuân Bình	Bí thư Đảng ủy, Chủ tịch HĐND xã	0986215363	
HUYỆN THẠCH THÀNH	XÃ NGỌC TRẠO	Lưu Thị Dung	Phó Bí thư Thường trực Đảng ủy	0917447386	
HUYỆN THẠCH THÀNH	XÃ NGỌC TRẠO	Lê Đông Thịnh	Phó Bí thư, Chủ tịch UBND xã	0986810880	
HUYỆN THẠCH THÀNH	XÃ NGỌC TRẠO	Nguyễn Quang Nam	Chánh Văn phòng	0819010684	
HUYỆN THẠCH THÀNH	XÃ NGỌC TRẠO	Phạm Hùng	Văn thư	0968530279	
HUYỆN THẠCH THÀNH	XÃ THẠCH BÌNH	Nguyễn Văn Mạnh	Bí thư Đảng ủy	0912353282	
HUYỆN THẠCH THÀNH	XÃ THẠCH BÌNH	Vũ Thị Dậu	Phó Bí thư Thường trực Đảng ủy	0961095443	
HUYỆN THẠCH THÀNH	XÃ THẠCH BÌNH	Lê Công Thành	Phó Bí thư, Chủ tịch UBND xã	0944269886	
HUYỆN THẠCH THÀNH	XÃ THẠCH BÌNH	Phạm Thanh Hiền	Phó Chánh Văn phòng	0338228668	
HUYỆN THẠCH THÀNH	XÃ THẠCH BÌNH	Nguyễn Thị Chanh	Văn thư	0912570224	
HUYỆN THẠCH THÀNH	XÃ THÀNH VINH	Trần Ngọc Chung	Bí thư Đảng ủy	0869811979	
HUYỆN THẠCH THÀNH	XÃ THÀNH VINH	Phạm Huy Hùng	Phó Bí thư Thường trực Đảng ủy	0812413888	
HUYỆN THẠCH THÀNH	XÃ THÀNH VINH	Bùi Văn Điệp	Phó Bí thư, Chủ tịch UBND xã	0987476548	
HUYỆN THẠCH THÀNH	XÃ THÀNH VINH	Trương Văn Tiên	Chánh Văn phòng	0989939400	
HUYỆN THẠCH THÀNH	XÃ THÀNH VINH	Nguyễn Hữu Luận	Văn thư	0356579141	
HUYỆN THẠCH THÀNH	XÃ THẠCH QUẢNG	Nguyễn Minh Tuân	Bí thư Đảng ủy, Chủ tịch HĐND xã	0982190728	
HUYỆN THẠCH THÀNH	XÃ THẠCH QUẢNG	Bùi Thị Bích Thủy	Phó Bí thư Thường trực Đảng ủy	0975975969	
HUYỆN THẠCH THÀNH	XÃ THẠCH QUẢNG	Lê Huy Dương	Phó Bí thư, Chủ tịch UBND xã	0966628181	
HUYỆN THẠCH THÀNH	XÃ THẠCH QUẢNG	Đoàn Quang Thuận	Chánh Văn phòng	0868991678	
HUYỆN THẠCH THÀNH	XÃ THẠCH QUẢNG	Bùi Văn Mạnh	Văn thư	0368046338	
HUYỆN CẨM THỦY	XÃ CẨM THẠCH	Nguyễn Văn Vi	Bí thư Đảng ủy	0917750149	
HUYỆN CẨM THỦY	XÃ CẨM THẠCH	Trương Văn Kiệm	Phó Bí thư Thường trực Đảng ủy	0932559668	
HUYỆN CẨM THỦY	XÃ CẨM THẠCH	Hà Thanh Sơn	Phó Bí thư, Chủ tịch UBND xã	0972213638	
HUYỆN CẨM THỦY	XÃ CẨM THẠCH	Nguyễn Văn Dũng	Chánh Văn phòng	0342656115	
HUYỆN CẨM THỦY	XÃ CẨM THẠCH	Phạm Thị Vui	Văn thư	0869849156	
HUYỆN CẨM THỦY	XÃ CẨM THỦY	Lê Văn Châu	Bí thư Đảng ủy, Chủ tịch HĐND xã	0974849700	
HUYỆN CẨM THỦY	XÃ CẨM THỦY	Trần Đức Hùng	Phó Bí thư Thường trực Đảng ủy	0915392238	
HUYỆN CẨM THỦY	XÃ CẨM THỦY	Nguyễn Tiến Lực	Phó Bí thư, Chủ tịch UBND xã	0973433456	
HUYỆN CẨM THỦY	XÃ CẨM THỦY	Phạm Xuân Quỳ	Chánh Văn phòng	0963132183	
HUYỆN CẨM THỦY	XÃ CẨM THỦY	Trịnh Thị Vân	Văn thư	0793023196	
HUYỆN CẨM THỦY	XÃ CẨM TÚ	Phạm Thị Nhàn	Bí thư Đảng ủy	0916923998	
HUYỆN CẨM THỦY	XÃ CẨM TÚ	Cao Minh Thức	Phó Bí thư Thường trực Đảng ủy	0919291668	
HUYỆN CẨM THỦY	XÃ CẨM TÚ	Phạm Minh Vũ	Phó Bí thư, Chủ tịch UBND xã	0916949117	
HUYỆN CẨM THỦY	XÃ CẨM TÚ	Cao Anh Vũ	Chánh Văn phòng	0978379545	
HUYỆN CẨM THỦY	XÃ CẨM TÚ	Cao Thị Thiện	Văn thư	0978585134	
HUYỆN CẨM THỦY	XÃ CẨM TÂN	Bùi Phương Liên	Bí thư Đảng ủy	0913453088	
HUYỆN CẨM THỦY	XÃ CẨM TÂN	Trần Đại Huyên	Phó Bí thư Thường trực Đảng ủy	0904246717	
HUYỆN CẨM THỦY	XÃ CẨM TÂN	Phạm Đắc Dung	Phó Bí thư, Chủ tịch UBND xã	0904709395	
HUYỆN CẨM THỦY	XÃ CẨM TÂN	Lê Đức Thọ	Chánh Văn phòng	0859990555	
HUYỆN CẨM THỦY	XÃ CẨM TÂN	Lê Thị Phúc	Văn thư	0339154681	
HUYỆN CẨM THỦY	XÃ CẨM VÂN	Bùi Thanh Minh	Bí thư Đảng ủy	0917750148	
HUYỆN CẨM THỦY	XÃ CẨM VÂN	Nguyễn Tiến Dũng	Phó Bí thư Thường trực Đảng ủy	0916696455	
HUYỆN CẨM THỦY	XÃ CẨM VÂN	Nguyễn Văn Hiệp	Phó Bí thư, Chủ tịch UBND xã	0915365288	
HUYỆN CẨM THỦY	XÃ CẨM VÂN	Phạm Phi Khanh	Chánh Văn phòng	0977396829	
HUYỆN CẨM THỦY	XÃ CẨM VÂN	Lê Thị Phương	Văn thư	0984530129	
HUYỆN NHƯ THANH	XÃ NHƯ THANH	Nguyễn Tiến Dũng	Bí thư Đảng ủy	0913300635	
HUYỆN NHƯ THANH	XÃ NHƯ THANH	Lê Thị Thúy Lan	Phó Bí thư Thường trực Đảng ủy	0987914670	
HUYỆN NHƯ THANH	XÃ NHƯ THANH	Hàn Văn Huyên	Phó Bí thư, Chủ tịch UBND xã	0914605805	
HUYỆN NHƯ THANH	XÃ NHƯ THANH	Lê Văn Long	Chánh Văn phòng	0986451333	
HUYỆN NHƯ THANH	XÃ NHƯ THANH	Đoàn Thị Bình	Văn thư	0986781080	
HUYỆN NHƯ THANH	XÃ XUÂN DU	Vũ Hữu Tuấn	Bí thư Đảng ủy	0977243850	
HUYỆN NHƯ THANH	XÃ XUÂN DU	Nguyễn Ngọc Lương	Phó Bí thư Thường trực Đảng ủy	0947634678	
HUYỆN NHƯ THANH	XÃ XUÂN DU	Lương Hồng Sỹ	Phó Bí thư, Chủ tịch UBND xã	0388508516	
HUYỆN NHƯ THANH	XÃ XUÂN DU	Nguyễn Văn Dũng	Chánh Văn phòng	0987323813	
HUYỆN NHƯ THANH	XÃ XUÂN DU	Quách Thị Thương	Văn thư	0961553568	
HUYỆN NHƯ THANH	XÃ YÊN THỌ	Đặng Tiến Dũng	Bí thư Đảng ủy	0342753888	
HUYỆN NHƯ THANH	XÃ YÊN THỌ	Lê Thị Giang	Phó Bí thư Thường trực Đảng ủy	0986140153	
HUYỆN NHƯ THANH	XÃ YÊN THỌ	Đỗ Thanh Minh	Phó Bí thư, Chủ tịch UBND xã	0984546222	
HUYỆN NHƯ THANH	XÃ YÊN THỌ	Nguyễn Hữu Đại	Chánh Văn phòng	0973964243	
HUYỆN NHƯ THANH	XÃ YÊN THỌ	Vũ Thị Hiền	Văn thư	0375348646	
HUYỆN NHƯ THANH	XÃ MẬU LÂM	Lê Văn Cường	Bí thư Đảng ủy	0987333869	
HUYỆN NHƯ THANH	XÃ MẬU LÂM	Lê Thị Nhung	Phó Bí thư Thường trực Đảng ủy	0912582508	
HUYỆN NHƯ THANH	XÃ MẬU LÂM	Hoàng Văn Thủy	Phó Bí thư, Chủ tịch UBND xã	0973903729	
HUYỆN NHƯ THANH	XÃ MẬU LÂM	Nguyễn Tiến Quý	Chánh Văn phòng	0986953123	
HUYỆN NHƯ THANH	XÃ MẬU LÂM	Trần Thị Dung	Văn thư	0986860191	
HUYỆN NHƯ THANH	XÃ XUÂN THÁI	Quách Thị Oanh	Bí thư Đảng ủy	0982421367	
HUYỆN NHƯ THANH	XÃ XUÂN THÁI	Trần Tiến Hưng	Phó Bí thư Thường trực Đảng ủy	0989429222	
HUYỆN NHƯ THANH	XÃ XUÂN THÁI	Lê Huy Chung	Phó Bí thư, Chủ tịch UBND xã	0912730844	
HUYỆN NHƯ THANH	XÃ XUÂN THÁI	Nguyễn Trọng Thắng	Chánh Văn phòng	0969783262~+84918818540	
HUYỆN NHƯ THANH	XÃ XUÂN THÁI	Lường Thị Bình	Văn thư	0987797620	
HUYỆN NHƯ THANH	XÃ THANH KỲ	Lê Văn Nghĩa	Bí thư Đảng ủy	0985313678	
HUYỆN NHƯ THANH	XÃ THANH KỲ	Phạm Văn Cường	Phó Bí thư Thường trực Đảng ủy	0934684599	
HUYỆN NHƯ THANH	XÃ THANH KỲ	Đặng Hồng Sơn	Phó Bí thư, Chủ tịch UBND xã	0987727862	
HUYỆN NHƯ THANH	XÃ THANH KỲ	Lê Duy Tỉnh	Chánh Văn phòng	0962599828	
HUYỆN NHƯ THANH	XÃ THANH KỲ	Nguyễn Thị Vân	Văn thư	0866700897	
HUYỆN NHƯ XUÂN	XÃ NHƯ XUÂN	Lê Việt Khoa	Bí thư Đảng ủy	0914995136	
HUYỆN NHƯ XUÂN	XÃ NHƯ XUÂN	Nguyễn Văn Dũng	Phó Bí thư Thường trực Đảng ủy	0975137335	
HUYỆN NHƯ XUÂN	XÃ NHƯ XUÂN	Nguyễn Quang Trường	Phó Bí thư, Chủ tịch UBND xã	0982847678	
HUYỆN NHƯ XUÂN	XÃ NHƯ XUÂN	Phùng Văn Thi	Chánh Văn phòng	0899600333	
HUYỆN NHƯ XUÂN	XÃ NHƯ XUÂN	Lê Thị Phương Nhung	Văn thư	0376219555	
HUYỆN NHƯ XUÂN	XÃ THƯỢNG NINH	Lê Bá Hùng	Bí thư Đảng ủy	0913390467	
HUYỆN NHƯ XUÂN	XÃ THƯỢNG NINH	Vi Thị Phượng	Phó Bí thư Thường trực Đảng ủy	0915950886	
HUYỆN NHƯ XUÂN	XÃ THƯỢNG NINH	Lê Đức Tuấn	Phó Bí thư, Chủ tịch UBND xã	0986633723	
HUYỆN NHƯ XUÂN	XÃ THƯỢNG NINH	Bùi Thị Kiều Trang	Chánh Văn phòng	0358847348	
HUYỆN NHƯ XUÂN	XÃ THƯỢNG NINH	Lô Thị Trang	Văn thư	0356103201	
HUYỆN NHƯ XUÂN	XÃ XUÂN BÌNH	Mai Công Hoàng	Bí thư Đảng ủy	0987658686	
HUYỆN NHƯ XUÂN	XÃ XUÂN BÌNH	Lê Văn Hiếu	Phó Bí thư Thường trực Đảng ủy	0976218222	
HUYỆN NHƯ XUÂN	XÃ XUÂN BÌNH	Nguyễn Trọng Luân	Phó Bí thư, Chủ tịch UBND xã	0978068286	
HUYỆN NHƯ XUÂN	XÃ XUÂN BÌNH	Nguyễn Văn Hòa	Chánh Văn phòng	0981054078	
HUYỆN NHƯ XUÂN	XÃ XUÂN BÌNH	Nguyễn Thị Thảo	Văn thư	0979027148	
HUYỆN NHƯ XUÂN	XÃ THANH QUÂN	Lê Văn Thuận	Bí thư Đảng ủy	0985826099	
HUYỆN NHƯ XUÂN	XÃ THANH QUÂN	Lò Văn Sức	Phó Bí thư Thường trực Đảng ủy	0976916899	
HUYỆN NHƯ XUÂN	XÃ THANH QUÂN	Lê Tiến Đạt	Phó Bí thư, Chủ tịch UBND xã	0982181101	
HUYỆN NHƯ XUÂN	XÃ THANH QUÂN	Lang Thị Trang	Chánh Văn phòng	0859259097	
HUYỆN NHƯ XUÂN	XÃ THANH QUÂN	Lê Thị Nghĩa	Văn thư	0367049650	
HUYỆN NHƯ XUÂN	XÃ THANH PHONG	Nguyễn Đức Đồng	Bí thư Đảng ủy, Chủ tịch HĐND xã	0967096668	
HUYỆN NHƯ XUÂN	XÃ THANH PHONG	Vi Thanh Hương	Phó Bí thư Thường trực Đảng ủy	0917052999	
HUYỆN NHƯ XUÂN	XÃ THANH PHONG	Đinh Văn Phương	Phó Bí thư, Chủ tịch UBND xã	0988313777	
HUYỆN NHƯ XUÂN	XÃ THANH PHONG	Lê Văn Dũng	Chánh Văn phòng	0972136914	
HUYỆN NHƯ XUÂN	XÃ THANH PHONG	Lê Văn Tuyến	Văn thư	0917894233	
HUYỆN NHƯ XUÂN	XÃ HÓA QUỲ	Lê Thị Tĩnh	Bí thư Đảng ủy	0985585176	
HUYỆN NHƯ XUÂN	XÃ HÓA QUỲ	Dương Văn Mến	Phó Bí thư Thường trực Đảng ủy	0986960934	
HUYỆN NHƯ XUÂN	XÃ HÓA QUỲ	Đỗ Tất Hùng	Phó Bí thư, Chủ tịch UBND xã	0983629998	
HUYỆN NHƯ XUÂN	XÃ HÓA QUỲ	Quách Văn Quảng	Chánh Văn phòng	0979498289	
HUYỆN NHƯ XUÂN	XÃ HÓA QUỲ	Lê Thị Sáu	Văn thư	0974796459	
HUYỆN THƯỜNG XUÂN	XÃ THƯỜNG XUÂN	Trương Trọng Tuấn	Bí thư Đảng ủy	0904226886	
HUYỆN THƯỜNG XUÂN	XÃ THƯỜNG XUÂN	Cầm Bá Nguyên	Phó Bí thư Thường trực Đảng ủy	0906053299	
HUYỆN THƯỜNG XUÂN	XÃ THƯỜNG XUÂN	Hoàng Sỹ Hùng	Phó Bí thư, Chủ tịch UBND xã	0943416999	
HUYỆN THƯỜNG XUÂN	XÃ THƯỜNG XUÂN	Nguyễn Mai Trung	Chánh Văn phòng	0917874888	
HUYỆN THƯỜNG XUÂN	XÃ THƯỜNG XUÂN	Lữ Thị Linh	Văn thư	0388078538	
HUYỆN THƯỜNG XUÂN	XÃ LUẬN THÀNH	Cầm Bá Lâm	Bí thư Đảng ủy	0914375899	
HUYỆN THƯỜNG XUÂN	XÃ LUẬN THÀNH	Trịnh Thị Vân Anh	Phó Bí thư Thường trực Đảng ủy	0917829888	
HUYỆN THƯỜNG XUÂN	XÃ LUẬN THÀNH	Ngô Văn Tường	Phó Bí thư, Chủ tịch UBND xã	0918388833	
HUYỆN THƯỜNG XUÂN	XÃ LUẬN THÀNH	Lang Đức Huy	Chánh Văn phòng	0947276185	
HUYỆN THƯỜNG XUÂN	XÃ LUẬN THÀNH	Trịnh Xuân Quang	Văn thư	0949878767	
HUYỆN THƯỜNG XUÂN	XÃ TÂN THÀNH	Lôi Quang Vũ	Bí thư Đảng ủy	0988379999	
HUYỆN THƯỜNG XUÂN	XÃ TÂN THÀNH	Lục Đăng Hỏa	Phó Bí thư Thường trực Đảng ủy	0967884399	
HUYỆN THƯỜNG XUÂN	XÃ TÂN THÀNH	Lê Hoàng Cường	Phó Bí thư, Chủ tịch UBND xã	0934595817	
HUYỆN THƯỜNG XUÂN	XÃ TÂN THÀNH	Vi Văn Phòng	Chánh Văn phòng	0903242789	
HUYỆN THƯỜNG XUÂN	XÃ TÂN THÀNH	Vi Văn Nhất	Văn thư	0961874322	
HUYỆN THƯỜNG XUÂN	XÃ THẮNG LỘC	Vi Ngọc Tuấn	Bí thư Đảng ủy, Chủ tịch HĐND xã	0969843666	
HUYỆN THƯỜNG XUÂN	XÃ THẮNG LỘC	Cầm Bá Quyền	Phó Bí thư Thường trực Đảng ủy	0917600333	
HUYỆN THƯỜNG XUÂN	XÃ THẮNG LỘC	Lê Văn Hùng	Phó Bí thư, Chủ tịch UBND xã	0904717161	
HUYỆN THƯỜNG XUÂN	XÃ THẮNG LỘC	Mai Văn Thuộc	Phó Chánh Văn phòng	0974700681	
HUYỆN THƯỜNG XUÂN	XÃ THẮNG LỘC	Hà Văn Dương	Văn thư	0347222672	
HUYỆN THƯỜNG XUÂN	XÃ XUÂN CHINH	Nguyên Ngọc Biên	Bí thư Đảng ủy	0915368314	
HUYỆN THƯỜNG XUÂN	XÃ XUÂN CHINH	Hoàng Văn Giang	Phó Bí thư Thường trực Đảng ủy	0944375066	
HUYỆN THƯỜNG XUÂN	XÃ XUÂN CHINH	Đỗ Đình Minh	Phó Bí thư, Chủ tịch UBND xã	0919328234	
HUYỆN THƯỜNG XUÂN	XÃ XUÂN CHINH	Phùng Duy Hiệp	Phó Chánh Văn phòng	0888504863	
HUYỆN THƯỜNG XUÂN	XÃ XUÂN CHINH	Cầm Bá Hoàng	Văn thư	0826170668	
HUYỆN THƯỜNG XUÂN	XÃ VẠN XUÂN	Cầm Thị Phượng	Bí thư Đảng ủy	0949079421	
HUYỆN THƯỜNG XUÂN	XÃ VẠN XUÂN	Lê Anh Tuấn	Phó Bí thư Thường trực Đảng ủy	0919278234	
HUYỆN THƯỜNG XUÂN	XÃ VẠN XUÂN	Vũ Thị Thu Phương	Phó Bí thư, Chủ tịch UBND xã	0904402805	
HUYỆN THƯỜNG XUÂN	XÃ VẠN XUÂN	Lê Văn Thực	Chánh Văn phòng	0945569093	
HUYỆN THƯỜNG XUÂN	XÃ VẠN XUÂN	Vi Thị Kim Nhung	Văn thư	0912522184	
HUYỆN THƯỜNG XUÂN	XÃ LƯƠNG SƠN	Nguyễn Minh Cảnh	Bí thư Đảng ủy	0912509668	
HUYỆN THƯỜNG XUÂN	XÃ LƯƠNG SƠN	Hà Thị Nguyệt	Phó Bí thư Thường trực Đảng ủy	0856992846	
HUYỆN THƯỜNG XUÂN	XÃ LƯƠNG SƠN	Nguyễn Xuân Đồng	Phó Bí thư, Chủ tịch UBND xã	0919018959	
HUYỆN THƯỜNG XUÂN	XÃ LƯƠNG SƠN	Cầm Thị Vân	Phó Chánh Văn phòng	0904906993	
HUYỆN THƯỜNG XUÂN	XÃ LƯƠNG SƠN	Dương Minh Thịnh	Văn thư	0916328336	
HUYỆN THƯỜNG XUÂN	XÃ BÁT MỌT	Lê Thanh Hải	Bí thư Đảng ủy	0916577036	
HUYỆN THƯỜNG XUÂN	XÃ BÁT MỌT	Lương Thị Lưu	Phó Bí thư Thường trực Đảng ủy	0327774678	
HUYỆN THƯỜNG XUÂN	XÃ BÁT MỌT	Nguyễn Thế Thắng	Phó Bí thư, Chủ tịch UBND xã	0986408999	
HUYỆN THƯỜNG XUÂN	XÃ BÁT MỌT	Trần Tiến Thắng	Phó Chánh Văn phòng	0338513366	
HUYỆN THƯỜNG XUÂN	XÃ BÁT MỌT	Lang Thanh Hải	Văn thư	0362657866	
HUYỆN THƯỜNG XUÂN	XÃ YÊN NHÂN	Phạm Việt Phương	Bí thư Đảng ủy	0914492556	
HUYỆN THƯỜNG XUÂN	XÃ YÊN NHÂN	Lương Văn Nhàn	Phó Bí thư Thường trực Đảng ủy	0389358134	
HUYỆN THƯỜNG XUÂN	XÃ YÊN NHÂN	Quách Thế Thuận	Phó Bí thư, Chủ tịch UBND xã	0916002880	
HUYỆN THƯỜNG XUÂN	XÃ YÊN NHÂN	Vi Thị Thắm	Chánh Văn phòng	0968497789	
HUYỆN THƯỜNG XUÂN	XÃ YÊN NHÂN	Vi Văn Thân	Văn thư	0948716875	
HUYỆN NGỌC LẶC	XÃ NGỌC LẶC	Phạm Tiến Dũng	Bí thư Đảng ủy	0912034988	
HUYỆN NGỌC LẶC	XÃ NGỌC LẶC	Nguyễn Thị Thanh	Phó Bí thư Thường trực Đảng ủy	0974985519	
HUYỆN NGỌC LẶC	XÃ NGỌC LẶC	Lê Công Tâm	Phó Bí thư, Chủ tịch UBND xã	0917393693	
HUYỆN NGỌC LẶC	XÃ NGỌC LẶC	Lê Quang Hưng	Chánh Văn phòng HĐND và UBND xã	0948075919	
HUYỆN NGỌC LẶC	XÃ NGỌC LẶC	Dương Thị Tú Quyên	Văn thư UBND xã	0976660161	
HUYỆN NGỌC LẶC	XÃ MINH SƠN	Phạm Thị Thu	Bí thư Đảng ủy	0914312202	
HUYỆN NGỌC LẶC	XÃ MINH SƠN	Hà Tiến Giang	Phó Bí thư Thường trực Đảng ủy	0948026484	
HUYỆN NGỌC LẶC	XÃ MINH SƠN	Đỗ Đức Ngọc	Phó Bí thư, Chủ tịch UBND xã	0912929327	
HUYỆN NGỌC LẶC	XÃ MINH SƠN	Phạm Văn Thưởng	Chánh Văn phòng	0867153656	
HUYỆN NGỌC LẶC	XÃ MINH SƠN	Lê Thị Huế	Văn thư	0918136078	
HUYỆN NGỌC LẶC	XÃ THẠCH LẬP	Phạm Văn Thiết	Bí thư Đảng ủy, Chủ tịch HĐND xã	0914313767	
HUYỆN NGỌC LẶC	XÃ THẠCH LẬP	Cao Viết Trường	Phó Bí thư Thường trực Đảng ủy	0918094892	
HUYỆN NGỌC LẶC	XÃ THẠCH LẬP	Phạm Thị Lý	Phó Bí thư, Chủ tịch UBND xã	0978399176	
HUYỆN NGỌC LẶC	XÃ THẠCH LẬP	Phạm Ngọc Biên	Chánh Văn phòng	0859060567	
HUYỆN NGỌC LẶC	XÃ THẠCH LẬP	Phạm Thị Thủy	Văn thư	0379090235	
HUYỆN NGỌC LẶC	XÃ NGỌC LIÊN	Bùi Huy Toàn	Bí thư Đảng ủy	0917560743	
HUYỆN NGỌC LẶC	XÃ NGỌC LIÊN	Phạm Thị Thu	Phó Bí thư Thường trực Đảng ủy	0917367250	
HUYỆN NGỌC LẶC	XÃ NGỌC LIÊN	Phan Thị Hà	Phó Bí thư, Chủ tịch UBND xã	0372338323~+84949435327	
HUYỆN NGỌC LẶC	XÃ NGỌC LIÊN	Lê Đăng Tuấn	Chánh Văn phòng	0374139768~+84943907927	
HUYỆN NGỌC LẶC	XÃ NGỌC LIÊN	Nguyễn Ngọc Vân Anh	Văn thư	0965104363	
HUYỆN NGỌC LẶC	XÃ NGUYỆT ẤN	Lê Bá Ngà	Bí thư Đảng ủy	0915678880	
HUYỆN NGỌC LẶC	XÃ NGUYỆT ẤN	Lê Thanh Hải	Phó Bí thư Thường trực Đảng ủy	0914157216	
HUYỆN NGỌC LẶC	XÃ NGUYỆT ẤN	Phạm Anh Tuấn	Phó Bí thư, Chủ tịch UBND xã	0914683446	
HUYỆN NGỌC LẶC	XÃ NGUYỆT ẤN	Bùi Thao Trường	Chánh Văn phòng	0338849097	
HUYỆN NGỌC LẶC	XÃ NGUYỆT ẤN	Ngân Thị Hương	Văn thư	0338382138	
HUYỆN NGỌC LẶC	XÃ KIÊN THỌ	Phạm Văn Đạt	Bí thư Đảng ủy, Chủ tịch HĐND xã	0912598567	
HUYỆN NGỌC LẶC	XÃ KIÊN THỌ	Phạm Tuấn Anh	Phó Bí thư Thường trực Đảng ủy	0914330818	
HUYỆN NGỌC LẶC	XÃ KIÊN THỌ	Lê Hùng Cường	Phó Bí thư, Chủ tịch UBND xã	0949130368	
HUYỆN NGỌC LẶC	XÃ KIÊN THỌ	Trịnh Đình Báu	Chánh Văn phòng	0965420386	
HUYỆN NGỌC LẶC	XÃ KIÊN THỌ	Lê Thị Hương	Văn thư	0962804453	
HUYỆN LANG CHÁNH	XÃ LINH SƠN	Nguyễn Xuân Hồng	Bí thư Đảng ủy, Chủ tịch HĐND xã	0942183183	
HUYỆN LANG CHÁNH	XÃ LINH SƠN	Lương Tuấn Huê	Phó Bí thư Thường trực Đảng ủy	0977789188	
HUYỆN LANG CHÁNH	XÃ LINH SƠN	Nguyễn Ngọc Sơn	Phó Bí thư, Chủ tịch UBND xã	0985732787	
HUYỆN LANG CHÁNH	XÃ LINH SƠN	Ngô Văn Hiếu	Chánh Văn phòng	0946261082	
HUYỆN LANG CHÁNH	XÃ LINH SƠN	Ngân Thị Hương Ly	Văn thư	0328632555	
HUYỆN LANG CHÁNH	XÃ ĐỒNG LƯƠNG	Hoàng Văn Thanh	Bí thư Đảng ủy, Chủ tịch HĐND xã	0916848258	
HUYỆN LANG CHÁNH	XÃ ĐỒNG LƯƠNG	Lê Hữu Tuân	Phó Bí thư Thường trực Đảng ủy	0985732786	
HUYỆN LANG CHÁNH	XÃ ĐỒNG LƯƠNG	Nguyễn Xuân Hạnh	Phó Bí thư, Chủ tịch UBND xã	0979968345	
HUYỆN LANG CHÁNH	XÃ ĐỒNG LƯƠNG	Lê Thị Thúy	Chánh Văn phòng	0966246086	
HUYỆN LANG CHÁNH	XÃ ĐỒNG LƯƠNG	Phạm Văn Mới	Văn thư	0979853860	
HUYỆN LANG CHÁNH	XÃ VĂN PHÚ	Lê Đức Tiến	Bí thư Đảng ủy, Chủ tịch HĐND xã	0986738567	
HUYỆN LANG CHÁNH	XÃ VĂN PHÚ	Lê Văn Khánh	Phó Bí thư Thường trực Đảng ủy	0869797858	
HUYỆN LANG CHÁNH	XÃ VĂN PHÚ	Vũ Quang Trung	Phó Bí thư, Chủ tịch UBND xã	0974183872	
HUYỆN LANG CHÁNH	XÃ VĂN PHÚ	Lương Xuân Đông	Chánh Văn phòng	0973453123	
HUYỆN LANG CHÁNH	XÃ VĂN PHÚ	Phạm Hồng Nguyễn	Văn thư	0962284838	
HUYỆN LANG CHÁNH	XÃ GIAO AN	Lữ Đức Chung	Bí thư Đảng ủy	0986964299	
HUYỆN LANG CHÁNH	XÃ GIAO AN	Lê Văn Nam	Phó Bí thư Thường trực Đảng ủy	0986216661	
HUYỆN LANG CHÁNH	XÃ GIAO AN	Nguyễn Viết Thắng	Phó Bí thư, Chủ tịch UBND xã	0377333688	
HUYỆN LANG CHÁNH	XÃ GIAO AN	Nguyễn Thị Nhiếp	Chánh Văn phòng	0977117012	
HUYỆN LANG CHÁNH	XÃ GIAO AN	Lương Văn Nhất	Phó Chánh Văn phòng phụ trách Văn thư	0967514988	
HUYỆN LANG CHÁNH	XÃ YÊN KHƯƠNG	Đỗ Văn Cường	Bí thư Đảng ủy, Chủ tịch HĐND xã	0919686646	
HUYỆN LANG CHÁNH	XÃ YÊN KHƯƠNG	Lê Thị Kiêu	Phó Bí thư Thường trực Đảng ủy	0965504686	
HUYỆN LANG CHÁNH	XÃ YÊN KHƯƠNG	Lê Quang Tùng	Phó Bí thư Đảng ủy, Chủ tịch UBND xã	0944763888	
HUYỆN LANG CHÁNH	XÃ YÊN KHƯƠNG	Phạm Ánh Nguyệt	Chánh Văn phòng	0919730038	
HUYỆN LANG CHÁNH	XÃ YÊN KHƯƠNG	Lò Văn Hơn	Văn thư	0969423199	
HUYỆN LANG CHÁNH	XÃ YÊN THẮNG	Lương Văn Phúc	Bí thư Đảng ủy	0986510567	
HUYỆN LANG CHÁNH	XÃ YÊN THẮNG	Lê Văn Hùng	Phó Bí thư Thường trực Đảng ủy	0379898789	
HUYỆN LANG CHÁNH	XÃ YÊN THẮNG	Vũ Thế Vinh	Phó Bí thư, Chủ tịch UBND xã	0912614135	
HUYỆN LANG CHÁNH	XÃ YÊN THẮNG	Vi Xuân Hùng	Chánh Văn phòng	0912805323	
HUYỆN LANG CHÁNH	XÃ YÊN THẮNG	Hà Thị Xem	Văn thư	0964159102	
HUYỆN BÁ THƯỚC	XÃ BÁ THƯỚC	Phạm Đình Minh	Bí thư Đảng ủy	0913364329	
HUYỆN BÁ THƯỚC	XÃ BÁ THƯỚC	Bùi Minh Hiền	Phó Bí thư Thường trực Đảng ủy	0942933294	
HUYỆN BÁ THƯỚC	XÃ BÁ THƯỚC	Nguyễn Công Đức Anh	Phó Bí thư, Chủ tịch UBND xã	0916067636	
HUYỆN BÁ THƯỚC	XÃ BÁ THƯỚC	Đỗ Thị Thảo	Phó Chánh Văn phòng	0987790965	
HUYỆN BÁ THƯỚC	XÃ BÁ THƯỚC	Hà Thị Huệ	Văn thư	0948811989	
HUYỆN BÁ THƯỚC	XÃ THIẾT ỐNG	Võ Minh Khoa	Bí thư Đảng ủy, Chủ tịch HĐND xã	0916550898	
HUYỆN BÁ THƯỚC	XÃ THIẾT ỐNG	Hà Quốc Thịnh	Phó Bí thư Thường trực Đảng ủy	0942616060	
HUYỆN BÁ THƯỚC	XÃ THIẾT ỐNG	Lê Thị Tâm	Phó Bí thư, Chủ tịch UBND xã	0942335567	
HUYỆN BÁ THƯỚC	XÃ THIẾT ỐNG	Phạm Văn Thắng	Chánh Văn phòng	0989160936	
HUYỆN BÁ THƯỚC	XÃ THIẾT ỐNG	Đinh Bích Nguyệt	Văn thư	0343582920	
HUYỆN BÁ THƯỚC	XÃ VĂN NHO	Ngọ Đình Hải	Bí thư Đảng ủy, Chủ tịch HĐND xã	0913293712	
HUYỆN BÁ THƯỚC	XÃ VĂN NHO	Lê Thị Hải Lý	Phó Bí thư Thường trực Đảng ủy	0972912188	
HUYỆN BÁ THƯỚC	XÃ VĂN NHO	Tống Minh Hóa	Phó Bí thư, Chủ tịch UBND xã	0914842396	
HUYỆN BÁ THƯỚC	XÃ VĂN NHO	Vũ Văn Hải	Chánh Văn phòng	0389311173	
HUYỆN BÁ THƯỚC	XÃ VĂN NHO	Hà Thị Phương	Văn thư	0966502065	
HUYỆN BÁ THƯỚC	XÃ ĐIỀN QUANG	Mai Hữu Phúc	Bí thư Đảng ủy	0912108920	
HUYỆN BÁ THƯỚC	XÃ ĐIỀN QUANG	Lê Hùng Cường	Phó Bí thư Thường trực Đảng ủy	0917282268	
HUYỆN BÁ THƯỚC	XÃ ĐIỀN QUANG	Trịnh Văn Dũng	Phó Bí thư, Chủ tịch UBND xã	0962048667	
HUYỆN BÁ THƯỚC	XÃ ĐIỀN QUANG	Phạm Công Lý	Chánh Văn phòng	0914181230	
HUYỆN BÁ THƯỚC	XÃ ĐIỀN QUANG	Vũ Thị Dân	Văn thư	0834189284	
HUYỆN BÁ THƯỚC	XÃ ĐIỀN LƯ	Lê Quang Huy	Bí thư Đảng ủy, Chủ tịch HĐND xã	0916633663	
HUYỆN BÁ THƯỚC	XÃ ĐIỀN LƯ	Trương Văn Minh	Phó Bí thư Thường trực Đảng ủy	0912348263	
HUYỆN BÁ THƯỚC	XÃ ĐIỀN LƯ	Lê Hùng Cường	Phó Bí thư, Chủ tịch UBND xã	0918093886	
HUYỆN BÁ THƯỚC	XÃ ĐIỀN LƯ	Tào Văn Tuấn	Chánh Văn phòng	0975188845	
HUYỆN BÁ THƯỚC	XÃ ĐIỀN LƯ	Nguyễn Văn Cảnh	Văn thư	0982778719	
HUYỆN BÁ THƯỚC	XÃ QUÝ LƯƠNG	Nguyễn Văn Tâm	Bí thư Đảng ủy	0916318582	
HUYỆN BÁ THƯỚC	XÃ QUÝ LƯƠNG	Phạm Văn Thẩm	Phó Bí thư Thường trực Đảng ủy	0916349035	
HUYỆN BÁ THƯỚC	XÃ QUÝ LƯƠNG	Nguyễn Xuân Sơn	Phó Bí thư, Chủ tịch UBND xã	0962285295	
HUYỆN BÁ THƯỚC	XÃ QUÝ LƯƠNG	Trương Văn Dần	Chánh Văn phòng HĐND&UBND	0868363855	
HUYỆN BÁ THƯỚC	XÃ QUÝ LƯƠNG	Cao Văn Thế	Văn thư	0988961534	
HUYỆN BÁ THƯỚC	XÃ CỔ LŨNG	Lê Văn Sơn	Bí thư Đảng ủy	0913318328	
HUYỆN BÁ THƯỚC	XÃ CỔ LŨNG	Lương Văn Thước	Phó Bí thư Thường trực Đảng ủy	0362990599	
HUYỆN BÁ THƯỚC	XÃ CỔ LŨNG	Lê Văn Hoài	Phó Bí thư, Chủ tịch UBND xã	0859282678	
HUYỆN BÁ THƯỚC	XÃ CỔ LŨNG	Lương Văn Kiên	Phó Chánh Văn phòng	0918682668	
HUYỆN BÁ THƯỚC	XÃ CỔ LŨNG	Vi Thị Miên	Văn thư	0915775141	
HUYỆN BÁ THƯỚC	XÃ PÙ LUÔNG	Bùi Thị Hoa	Bí thư Đảng ủy	0902499636	
HUYỆN BÁ THƯỚC	XÃ PÙ LUÔNG	Hà Nam Khánh	Phó Bí thư Thường trực Đảng ủy	0912202202	
HUYỆN BÁ THƯỚC	XÃ PÙ LUÔNG	Trần Duy Tiến	Phó Bí thư, Chủ tịch UBND xã	0912426456	
HUYỆN BÁ THƯỚC	XÃ PÙ LUÔNG	Ngân Văn Lệ	Chánh Văn phòng	0966957123	
HUYỆN BÁ THƯỚC	XÃ PÙ LUÔNG	Hà Thị Nghiệp	Văn thư	0965118512	
HUYỆN QUAN HÓA	XÃ HỒI XUÂN	Hà Thị Hương	Bí thư Đảng ủy	0912092762	
HUYỆN QUAN HÓA	XÃ HỒI XUÂN	Lữ Thị Mai	Phó Bí thư Thường trực Đảng ủy	0825886388	
HUYỆN QUAN HÓA	XÃ HỒI XUÂN	Lê Văn Dũng	Phó Bí thư, Chủ tịch UBND xã	0845565588	
HUYỆN QUAN HÓA	XÃ HỒI XUÂN	Phạm Văn Việt	Chánh Văn phòng	0988640472	
HUYỆN QUAN HÓA	XÃ HỒI XUÂN	Cao Văn Nguyện	Văn thư	0979578983	
HUYỆN QUAN HÓA	XÃ NAM XUÂN	Hà Thị Cươi	Bí thư Đảng ủy	0846931268	
HUYỆN QUAN HÓA	XÃ NAM XUÂN	Hà Thị Thu Huyền	Phó Bí thư Thường trực Đảng ủy	0963875123	
HUYỆN QUAN HÓA	XÃ NAM XUÂN	Ninh Văn Đông	Phó Bí thư, Chủ tịch UBND xã	0902042939	
HUYỆN QUAN HÓA	XÃ NAM XUÂN	Phạm Thị Phương	Chánh Văn phòng	0977371599	
HUYỆN QUAN HÓA	XÃ NAM XUÂN	Phạm Văn Sỹ	Văn thư	0865591319	
HUYỆN QUAN HÓA	XÃ PHÚ LỆ	Hà Văn Thủy	Bí thư Đảng ủy	0961173999	
HUYỆN QUAN HÓA	XÃ PHÚ LỆ	Hà Văn Nhiệt	Phó Bí thư Thường trực Đảng ủy	0367080757	
HUYỆN QUAN HÓA	XÃ PHÚ LỆ	Nguyễn Văn Bình	Phó Bí thư, Chủ tịch UBND xã	0913049958	
HUYỆN QUAN HÓA	XÃ PHÚ LỆ	Cao Xuân Thắng	Chánh Văn phòng	0976046143	
HUYỆN QUAN HÓA	XÃ PHÚ LỆ	Hà Thị Ngọc	Văn thư	0949015654	
HUYỆN QUAN HÓA	XÃ PHÚ XUÂN	Nguyễn Văn Khải	Bí thư Đảng ủy, Chủ tịch HĐND xã	0912116633	
HUYỆN QUAN HÓA	XÃ PHÚ XUÂN	Nguyễn Tuấn Anh	Phó Bí thư Thường trực Đảng ủy	0904179579	
HUYỆN QUAN HÓA	XÃ PHÚ XUÂN	Phạm Quốc Thịnh	Phó Bí thư, Chủ tịch UBND xã	0974480585	
HUYỆN QUAN HÓA	XÃ PHÚ XUÂN	Hà Minh Thạch	Chánh Văn phòng	0362249636	
HUYỆN QUAN HÓA	XÃ PHÚ XUÂN	Phạm Thị Linh Ngân	Văn thư	0968316263	
HUYỆN QUAN HÓA	XÃ TRUNG THÀNH	Bùi Công Anh	Bí thư Đảng ủy	0982518165	
HUYỆN QUAN HÓA	XÃ TRUNG THÀNH	Vi Đức Thùy	Phó Bí thư Thường trực Đảng ủy	0343736999	
HUYỆN QUAN HÓA	XÃ TRUNG THÀNH	Phạm Thị Tuyết	Phó Bí thư, Chủ tịch UBND xã	0973410368	
HUYỆN QUAN HÓA	XÃ TRUNG THÀNH	Hà Thanh Tuấn	Chánh Văn phòng	0828889050	
HUYỆN QUAN HÓA	XÃ TRUNG THÀNH	Hắc Ngọc Thắng	Văn thư	0962965775	
HUYỆN QUAN HÓA	XÃ TRUNG SƠN	Hà Thị Nga	Bí thư Đảng ủy	0913368363	
HUYỆN QUAN HÓA	XÃ TRUNG SƠN	Ngô Sĩ Tâm	Phó Bí thư Thường trực Đảng ủy	0978922292	
HUYỆN QUAN HÓA	XÃ TRUNG SƠN	Đỗ Phi Hùng	Phó Bí thư, Chủ tịch UBND xã	0868484578	
HUYỆN QUAN HÓA	XÃ TRUNG SƠN	Ngân Thế Anh	Phó Chánh Văn phòng HĐND&UBND	0968229630	
HUYỆN QUAN HÓA	XÃ TRUNG SƠN	Hà Thị Đậm	Văn thư	0377671980	
HUYỆN QUAN HÓA	XÃ HIỀN KIỆT	Lê Duy Hằng	Bí thư Đảng ủy, Chủ tịch HĐND xã	0968451773	
HUYỆN QUAN HÓA	XÃ HIỀN KIỆT	Vũ Ngọc Tuấn	Phó Bí thư Thường trực Đảng ủy	0943185188	
HUYỆN QUAN HÓA	XÃ HIỀN KIỆT	Lê Văn Tài	Phó Bí thư, Chủ tịch UBND xã	0989727565	
HUYỆN QUAN HÓA	XÃ HIỀN KIỆT	Nguyễn Hữu Dũng	Chánh Văn phòng	0985843737	
HUYỆN QUAN HÓA	XÃ HIỀN KIỆT	Hà Văn Hạnh	Văn thư	0352529078	
HUYỆN QUAN HÓA	XÃ THIÊN PHỦ	Nguyễn Đức Dũng	Bí thư Đảng ủy	0989314758	
HUYỆN QUAN HÓA	XÃ THIÊN PHỦ	Hà Huy Biến	Phó Bí thư Thường trực Đảng ủy	0377283552	
HUYỆN QUAN HÓA	XÃ THIÊN PHỦ	Phan Văn Đại	Phó Bí thư, Chủ tịch UBND xã	0987944296	
HUYỆN QUAN HÓA	XÃ THIÊN PHỦ	Hà Văn Trường	Chánh Văn phòng	0968961606	
HUYỆN QUAN HÓA	XÃ THIÊN PHỦ	Phạm Thị Hằng	Văn thư	0985993073	
HUYỆN QUAN SƠN	XÃ QUAN SƠN	Lê Hồng Quang	Bí thư Đảng ủy	0963689090	
HUYỆN QUAN SƠN	XÃ QUAN SƠN	Phạm Anh Tuấn	Phó Bí thư Thường trực Đảng ủy	0325225788	
HUYỆN QUAN SƠN	XÃ QUAN SƠN	Vi Thị Trọng	Phó Bí thư, Chủ tịch UBND xã	0965860555	
HUYỆN QUAN SƠN	XÃ QUAN SƠN	Hà Thị Lan	Chánh Văn phòng	0963635890	
HUYỆN QUAN SƠN	XÃ QUAN SƠN	Lữ Thị Phú	Văn thư	0917560788	
HUYỆN QUAN SƠN	XÃ TRUNG HẠ	Hà Xuân Thành	Bí thư Đảng ủy	0912582865	
HUYỆN QUAN SƠN	XÃ TRUNG HẠ	Hà Văn Mới	Phó Bí thư Thường trực Đảng ủy	0853033512	
HUYỆN QUAN SƠN	XÃ TRUNG HẠ	Lữ Văn Hà	Phó Bí thư, Chủ tịch UBND xã	0942145666	
HUYỆN QUAN SƠN	XÃ TRUNG HẠ	Vi Văn Xuyến	Chánh Văn phòng	0399179822	
HUYỆN QUAN SƠN	XÃ TRUNG HẠ	Vi Văn Thái	Văn thư	0858648928	
HUYỆN QUAN SƠN	XÃ NA MÈO	Hà Thị Tuyến	Bí thư Đảng ủy, Chủ tịch HĐND xã	0962214450	
HUYỆN QUAN SƠN	XÃ NA MÈO	Phạm Đức Lương	Phó Bí thư Thường trực Đảng ủy	0961267345	
HUYỆN QUAN SƠN	XÃ NA MÈO	Lương Văn Thủy	Phó Bí thư, Chủ tịch UBND xã	0343179686	
HUYỆN QUAN SƠN	XÃ NA MÈO	Lò Văn Đính	Chánh Văn phòng	0335613589	
HUYỆN QUAN SƠN	XÃ NA MÈO	Vi Văn Hoàng	Văn thư	0379568789	
HUYỆN QUAN SƠN	XÃ TAM LƯ	Chu Đình Trọng	Bí thư Đảng ủy	0987755678	
HUYỆN QUAN SƠN	XÃ TAM LƯ	Phạm Thị Hoan	Phó Bí thư Thường trực Đảng ủy	0966108806	
HUYỆN QUAN SƠN	XÃ TAM LƯ	Phạm Bá Chiến	Phó Bí thư, Chủ tịch UBND xã	0943387126	
HUYỆN QUAN SƠN	XÃ TAM LƯ	Lộc Thị Vân	Chánh Văn phòng	0978817788	
HUYỆN QUAN SƠN	XÃ TAM LƯ	Lữ Văn Thái	Văn thư	0987710465	
HUYỆN QUAN SƠN	XÃ TAM THANH	Phạm Quang Tuấn	Bí thư Đảng ủy	0942635678	
HUYỆN QUAN SƠN	XÃ TAM THANH	Lê Thế Anh	Phó Bí thư Thường trực Đảng ủy	0969043603	
HUYỆN QUAN SƠN	XÃ TAM THANH	Hà Văn Toản	Phó Bí thư, Chủ tịch UBND xã	0827888789	
HUYỆN QUAN SƠN	XÃ TAM THANH	Hà Thị Chai	Chánh Văn phòng	0395747530	
HUYỆN QUAN SƠN	XÃ TAM THANH	Hà Văn Tuệ	Văn thư	0362024075	
HUYỆN QUAN SƠN	XÃ SƠN ĐIỆN	Trịnh Vinh Lực	Bí thư Đảng ủy	0982625876	
HUYỆN QUAN SƠN	XÃ SƠN ĐIỆN	Lê Thế Anh	Phó Bí thư Thường trực Đảng ủy	0915279200	
HUYỆN QUAN SƠN	XÃ SƠN ĐIỆN	Phạm Văn Tình	Phó Bí thư, Chủ tịch UBND xã	0915279047	
HUYỆN QUAN SƠN	XÃ SƠN ĐIỆN	Đinh Công Báo	Chánh Văn phòng	0373761446	
HUYỆN QUAN SƠN	XÃ SƠN ĐIỆN	Phạm Thị Oanh	Văn thư	0374949685	
HUYỆN QUAN SƠN	XÃ MƯỜNG MÌN	Lương Văn Hiệp	Bí thư Đảng ủy	0386920548	
HUYỆN QUAN SƠN	XÃ MƯỜNG MÌN	Vi Văn Khuyến	Phó Bí thư Thường trực Đảng ủy	0336919303	
HUYỆN QUAN SƠN	XÃ MƯỜNG MÌN	Ngân Văn Hanh	Phó Bí thư, Chủ tịch UBND xã	0977291415	
HUYỆN QUAN SƠN	XÃ MƯỜNG MÌN	Lữ Văn Nhưng	Chánh Văn phòng	0359858898	
HUYỆN QUAN SƠN	XÃ MƯỜNG MÌN	Lương Văn Oanh	Văn thư	0965393158	
HUYỆN QUAN SƠN	XÃ SƠN THỦY	Lê Đình Xuân	Bí thư Đảng ủy	0988963088	
HUYỆN QUAN SƠN	XÃ SƠN THỦY	Mai Thị Nhung	Phó Bí thư Thường trực Đảng ủy	0366054167	
HUYỆN QUAN SƠN	XÃ SƠN THỦY	Mạc Văn Tới	Phó Bí thư, Chủ tịch UBND xã	0984399567	
HUYỆN QUAN SƠN	XÃ SƠN THỦY	Lữ Thị Thu Hà	Chánh Văn phòng	0966200690	
HUYỆN QUAN SƠN	XÃ SƠN THỦY	Phạm Văn Huân	Phó Chánh Văn phòng kiêm Văn thư	0943636085	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG LÁT	Trịnh Văn Thế	Bí thư Đảng ủy, Chủ tịch HĐND xã	0889338333	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG LÁT	Lê Công Nam	Phó Bí thư Thường trực Đảng ủy	0976610586	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG LÁT	Trịnh Văn Bắc	Phó Bí thư, Chủ tịch UBND xã	0932382989	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG LÁT	Hà Văn Thìn	Phó Chánh Văn phòng	0966797628	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG LÁT	Hà Thị Anh	Văn thư	0946327083	
HUYỆN MƯỜNG LÁT	XÃ TRUNG LÝ	Hà Văn Ca	Bí thư Đảng ủy	0973978977	
HUYỆN MƯỜNG LÁT	XÃ TRUNG LÝ	Lâu Văn Phía	Phó Bí thư Thường trực Đảng ủy	0377625226	
HUYỆN MƯỜNG LÁT	XÃ TRUNG LÝ	Trần Văn Thắng	Phó Bí thư, Chủ tịch UBND xã	0913978616	
HUYỆN MƯỜNG LÁT	XÃ TRUNG LÝ	Trương Văn Sự	Chánh Văn phòng	0396501111	
HUYỆN MƯỜNG LÁT	XÃ TRUNG LÝ	Phạm Mạnh Hùng	Văn thư	0965751138	
HUYỆN MƯỜNG LÁT	XÃ PÙ NHI	Đoàn Văn Trường	Bí thư Đảng ủy, Chủ tịch HĐND xã	0979283406	
HUYỆN MƯỜNG LÁT	XÃ PÙ NHI	Lê Quang Nghị	Phó Bí thư Thường trực Đảng ủy	0987836974	
HUYỆN MƯỜNG LÁT	XÃ PÙ NHI	Hắp Quỳnh Trang	Phó Bí thư, Chủ tịch UBND xã	0949934086	
HUYỆN MƯỜNG LÁT	XÃ PÙ NHI	Vũ Đình Tuấn	Quyền Chánh Văn phòng	0969546815	
HUYỆN MƯỜNG LÁT	XÃ PÙ NHI	Ngân Thị Nguyện	Văn thư	0973093397	
HUYỆN MƯỜNG LÁT	XÃ QUANG CHIỂU	Triệu Minh Xiết	Bí thư Đảng ủy	0972730168	
HUYỆN MƯỜNG LÁT	XÃ QUANG CHIỂU	Hà Thị Nhơn	Phó Bí thư Thường trực Đảng ủy	0869979123	
HUYỆN MƯỜNG LÁT	XÃ QUANG CHIỂU	Lê Văn Hiếu	Phó Bí thư, Chủ tịch UBND xã	0968218568	
HUYỆN MƯỜNG LÁT	XÃ QUANG CHIỂU	Vi Văn Thứ	Chánh Văn phòng	0326124399	
HUYỆN MƯỜNG LÁT	XÃ QUANG CHIỂU	Hà Thị Nga	Văn thư	0964626104	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG CHANH	Hà Văn Thiếu	Bí thư Đảng ủy	0965861686	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG CHANH	Lục Văn Tâm	Phó Bí thư Thường trực Đảng ủy	0839496789	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG CHANH	Hà Văn Tế	Phó Bí thư, Chủ tịch UBND xã	0869790368	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG CHANH	Lộc Văn Cún	Phó Chánh Văn phòng	0372765657	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG CHANH	Vi Thị Hồng Hà	Văn thư	0367359062	
HUYỆN MƯỜNG LÁT	XÃ TAM CHUNG	Lương Thị Tuân	Bí thư Đảng ủy, Chủ tịch HĐND xã	0918065123	
HUYỆN MƯỜNG LÁT	XÃ TAM CHUNG	Nguyễn Viết Bắc	Phó Bí thư Thường trực Đảng ủy	0989283938	
HUYỆN MƯỜNG LÁT	XÃ TAM CHUNG	Nguyễn Văn Dũng	Phó Bí thư, Chủ tịch UBND xã	0978439198	
HUYỆN MƯỜNG LÁT	XÃ TAM CHUNG	Trương Văn Trình	Chánh Văn phòng	0983821486	
HUYỆN MƯỜNG LÁT	XÃ TAM CHUNG	Quách Thị Thái	Văn thư	0366093275	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG LÝ	Phạm Văn Sơn	Bí thư Đảng ủy, Chủ tịch HĐND xã	0985786459	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG LÝ	Phạm Minh Đức	Phó Bí thư Thường trực Đảng ủy	0943913868	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG LÝ	Vi Văn Hùng	Phó Bí thư, Chủ tịch UBND xã	0383535268	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG LÝ	Lương Xuân Thuần	Chánh Văn phòng	0336090686	
HUYỆN MƯỜNG LÁT	XÃ MƯỜNG LÝ	Trương Thị Thảo	Văn thư	0392403623	
HUYỆN MƯỜNG LÁT	XÃ NHI SƠN	Lâu Dị Lênh	Bí thư Đảng ủy	0966931438	
HUYỆN MƯỜNG LÁT	XÃ NHI SƠN	Lầu Mai Dơ	Phó Bí thư Thường trực Đảng ủy	0979278956	
HUYỆN MƯỜNG LÁT	XÃ NHI SƠN	Lê Hữu Nghị	Phó Bí thư, Chủ tịch UBND xã	0968348678	
HUYỆN MƯỜNG LÁT	XÃ NHI SƠN	Hà Văn Mựng	Phó Chánh Văn phòng	0358887619	
HUYỆN MƯỜNG LÁT	XÃ NHI SƠN	Nguyễn Văn Dũng	Văn thư	0976916268	
`;

export const communeOfficials: CommuneContact[] = rawCommuneData.split('\n')
  .filter(line => line.trim() !== '')
  .map(line => {
    const parts = line.split('\t');
    return {
      district: parts[0] || '',
      commune: parts[1] || '',
      name: parts[2] || '',
      position: parts[3] || '',
      phone: parts[4] || '',
      email: parts[5] || ''
    };
  });
